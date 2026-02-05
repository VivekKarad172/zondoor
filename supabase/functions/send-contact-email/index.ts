import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/denomailer@0.12.0/mod.ts";

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

// HTML escape function to prevent XSS
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const contactData: ContactFormData = await req.json();
    
    // Validate the input data
    if (!contactData.name || !contactData.email || !contactData.phone || !contactData.message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Validate input lengths to prevent abuse
    if (contactData.name.length > 100 || contactData.email.length > 255 || 
        contactData.phone.length > 20 || contactData.message.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Input exceeds maximum allowed length" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Log the received form data (without sensitive details)
    console.log("Contact form submission received:", {
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone,
      messageLength: contactData.message.length,
    });

    // Get SMTP credentials from environment variables
    const smtpUsername = Deno.env.get("SMTP_USERNAME");
    const smtpPassword = Deno.env.get("SMTP_PASSWORD");

    if (!smtpUsername || !smtpPassword) {
      console.error("SMTP credentials not configured");
      return new Response(
        JSON.stringify({ error: "Email service is not configured. Please contact support." }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    try {
      // Initialize SMTP client with environment credentials
      const client = new SmtpClient();
      
      await client.connectTLS({
        hostname: "smtp-relay.brevo.com",
        port: 587,
        username: smtpUsername,
        password: smtpPassword,
      });
      
      console.log("SMTP client initialized");

      // Sanitize user input to prevent XSS
      const safeName = escapeHtml(contactData.name);
      const safeEmail = escapeHtml(contactData.email);
      const safePhone = escapeHtml(contactData.phone);
      const safeMessage = escapeHtml(contactData.message).replace(/\n/g, "<br>");

      // Prepare email content with sanitized data
      const emailContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              h1 { color: #2563eb; }
              .info { margin-bottom: 20px; }
              .label { font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>New Website Inquiry</h1>
              <div class="info">
                <p><span class="label">Name:</span> ${safeName}</p>
                <p><span class="label">Email:</span> ${safeEmail}</p>
                <p><span class="label">Phone:</span> ${safePhone}</p>
                <p><span class="label">Message:</span></p>
                <p>${safeMessage}</p>
              </div>
              <p>This message was sent from the Z-on Door website contact form.</p>
            </div>
          </body>
        </html>
      `;

      // Send the email
      await client.send({
        from: "INFO@ZONDOOR.COM",
        to: "ZONDOOR1@GMAIL.COM",
        subject: "New Website Inquiry",
        html: emailContent,
      });
      
      console.log("Email sent successfully");

      return new Response(
        JSON.stringify({ success: true, message: "Your message has been sent successfully!" }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    } catch (emailError) {
      // Log detailed error server-side only
      console.error("Error sending email:", emailError);
      
      // Return generic error to client (no internal details)
      return new Response(
        JSON.stringify({ error: "Failed to send your message. Please try again later." }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
  } catch (error) {
    // Log detailed error server-side only
    console.error("Error processing request:", error);
    
    // Return generic error to client
    return new Response(
      JSON.stringify({ error: "Failed to process your request. Please try again." }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
