import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const contactData: ContactFormData = await req.json();

    if (!contactData.name || !contactData.email || !contactData.phone || !contactData.message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (contactData.name.length > 100 || contactData.email.length > 255 ||
        contactData.phone.length > 20 || contactData.message.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Input exceeds maximum allowed length" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Contact form submission received:", {
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone,
      messageLength: contactData.message.length,
    });

    // Use SMTP_PASSWORD as the Brevo API key (same credential)
    const brevoApiKey = Deno.env.get("SMTP_PASSWORD");

    if (!brevoApiKey) {
      console.error("Brevo API key not configured");
      return new Response(
        JSON.stringify({ error: "Email service is not configured." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const safeName = escapeHtml(contactData.name);
    const safeEmail = escapeHtml(contactData.email);
    const safePhone = escapeHtml(contactData.phone);
    const safeMessage = escapeHtml(contactData.message).replace(/\n/g, "<br>");

    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h1 { color: #2563eb; }
            .label { font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>New Website Inquiry</h1>
            <p><span class="label">Name:</span> ${safeName}</p>
            <p><span class="label">Email:</span> ${safeEmail}</p>
            <p><span class="label">Phone:</span> ${safePhone}</p>
            <p><span class="label">Message:</span></p>
            <p>${safeMessage}</p>
            <p>This message was sent from the Z-on Door website contact form.</p>
          </div>
        </body>
      </html>
    `;

    // Use Brevo HTTP API instead of SMTP
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "api-key": brevoApiKey,
        "content-type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Z-on Door Website", email: "INFO@ZONDOOR.COM" },
        to: [{ email: "ZONDOOR1@GMAIL.COM", name: "Z-on Door" }],
        replyTo: { email: contactData.email, name: contactData.name },
        subject: `New Website Inquiry from ${safeName}`,
        htmlContent: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Brevo API error:", JSON.stringify(errorData));
      return new Response(
        JSON.stringify({ error: "Failed to send your message. Please try again later." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Email sent successfully via Brevo API");

    return new Response(
      JSON.stringify({ success: true, message: "Your message has been sent successfully!" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process your request. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
