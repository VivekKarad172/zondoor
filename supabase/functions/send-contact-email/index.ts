
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@0.12.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
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

    // Log the received form data
    console.log("Contact form submission received:", {
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone,
      messageLength: contactData.message.length,
    });

    // Initialize SMTP client
    const client = new SMTPClient({
      connection: {
        hostname: "smtp-relay.sendinblue.com",
        port: 587,
        tls: true,
        auth: {
          username: "VIVEKKARAD77@GMAIL.COM", 
          password: Deno.env.get("BREVO_SMTP_PASSWORD") || "",
        },
      },
    });

    // Connect to SMTP server
    await client.connect();
    console.log("Connected to SMTP server");

    // Prepare email content
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
            <h1>New Contact Form Submission</h1>
            <div class="info">
              <p><span class="label">Name:</span> ${contactData.name}</p>
              <p><span class="label">Email:</span> ${contactData.email}</p>
              <p><span class="label">Phone:</span> ${contactData.phone}</p>
              <p><span class="label">Message:</span></p>
              <p>${contactData.message.replace(/\n/g, "<br>")}</p>
            </div>
            <p>This message was sent from the Z-on Door website contact form.</p>
          </div>
        </body>
      </html>
    `;

    // Send the email
    await client.send({
      from: "info@zondoor.com",
      to: "zondoor1@gmail.com",
      subject: `Z-on Door: New Contact Form Submission from ${contactData.name}`,
      html: emailContent,
      headers: {
        "Reply-To": contactData.email,
      },
    });
    
    console.log("Email sent successfully");
    
    // Disconnect from SMTP server
    await client.close();

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to send email", 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
