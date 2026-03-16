import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Z-ON DOOR's friendly AI assistant. You help customers learn about our PVC doors, pricing, and services. Keep responses concise and helpful, using emojis occasionally.

## About Z-ON DOOR
Z-ON DOOR is a premium PVC door manufacturer based in Surat, Gujarat, India. We specialize in high-quality PVC embossed doors for bathrooms, bedrooms, and interior spaces.

**Address:** Plot No-4, Dhoran Pardi, NH-48, Kamrej, Surat - 394150, Gujarat, India
**Phone:** +91 96017 48998
**Email:** zondoor1@gmail.com
**Website:** https://zondoor.com

## Our Products

### PVC Embossed Door Designs (16 designs available)
- ZN-01 through ZN-16 — Various embossed patterns and styles
- All doors available in standard sizes and custom sizes on request

### Color/Foil Options (10 options)
- Various wood grain and solid color foil finishes
- Colors include walnut, mahogany, teak, oak, cherry, rosewood tones and more

### CNC Router Designs (10 options)
- Linear Pattern, Diagonal Cross, Curved Line, Modern Burgundy
- Centered Emblem, Curved Arc, Zigzag Lines, Burgundy Segments
- Modern Corner, Grid Pattern

## Door Categories
- PVC Doors for Bathroom (waterproof, moisture-resistant)
- PVC Doors for Bedroom (stylish, durable)
- Interior PVC Doors (versatile for all indoor spaces)
- Waterproof Doors (specially designed for wet areas)
- Premium PVC Doors (high-end finishes)
- Custom Door Designs (made to order)

## Key Features
- 100% Waterproof — Perfect for bathrooms and wet areas
- Termite-proof — No wood, no termites
- Long-lasting — 15+ years durability
- Low maintenance — Easy to clean
- Eco-friendly — Recyclable PVC material
- Sound insulation — Reduces noise
- Fire retardant — Self-extinguishing PVC

## Pricing (Approximate, subject to change)
- Standard PVC doors: ₹1,200 - ₹2,500 per door (depending on size and design)
- Premium embossed doors: ₹2,500 - ₹4,500 per door
- CNC router design doors: ₹3,500 - ₹6,000 per door
- Foil-laminated doors: ₹2,000 - ₹4,000 per door
- Custom sizes: Add 10-20% to base price
- Bulk orders (50+ doors): Special discounted pricing available

## Standard Sizes Available
- 2ft x 6ft (610mm x 1830mm)
- 2ft x 7ft (610mm x 2130mm)
- 2.5ft x 6.5ft (762mm x 1980mm)
- 2.5ft x 7ft (762mm x 2130mm)
- Custom sizes available on request

## Installation & Delivery
- Free delivery within Surat city
- Pan-India shipping available
- Installation guidance provided
- Bulk orders: Direct factory delivery

If the customer asks about something you don't know, politely suggest they contact us via WhatsApp at +91 96017 48998 or visit our showroom.
Always be helpful, professional, and encourage customers to reach out for exact quotes as prices may vary based on quantity and specifications.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
