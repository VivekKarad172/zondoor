
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/denomailer@0.12.0/mod.ts";

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

    try {
      // Initialize SMTP client with the new credentials
      const client = new SmtpClient();
      
      await client.connectTLS({
        hostname: "smtp-relay.brevo.com",
        port: 587,
        username: "887c5c002@smtp-brevo.com",
        password: "7Tb8mKBL3zYPhjcX",
      });
      
      console.log("SMTP client initialized");

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
              <h1>New Website Inquiry</h1>
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
      console.error("Error sending email:", emailError);
      
      const errorMessage = emailError instanceof Error ? emailError.message : "Unknown error";
      
      // Return a more specific error that includes SMTP details
      return new Response(
        JSON.stringify({ 
          error: "Failed to send your message. Please try again.", 
          details: errorMessage
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to process your request", 
        details: errorMessage 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
