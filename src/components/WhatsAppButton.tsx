
import React from "react";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message: string;
  className?: string;
}

const WhatsAppButton = ({
  phoneNumber,
  message,
  className,
}: WhatsAppButtonProps) => {
  // Format phone number (remove any non-digit characters)
  const formattedPhone = phoneNumber.replace(/\D/g, "");
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#22c55e] transition-all duration-300 hover:scale-110",
        className
      )}
      aria-label="Chat on WhatsApp"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="28" 
        height="28" 
        viewBox="0 0 24 24" 
        fill="white"
      >
        <path 
          d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.88 11.89L4 21l5.23-1.37A7.83 7.83 0 0 0 12.05 20h.5A7.9 7.9 0 0 0 20 12.13a7.74 7.74 0 0 0-2.4-5.81Zm-5.55 12.18h-.5a6.54 6.54 0 0 1-3.35-.92l-.24-.15-2.49.66.66-2.43-.16-.25a6.6 6.6 0 0 1-1-3.48 6.65 6.65 0 0 1 2-4.73 6.52 6.52 0 0 1 4.61-1.9h.25a6.46 6.46 0 0 1 6.18 6.57 6.55 6.55 0 0 1-5.95 6.63Z" 
          stroke="none"
        />
        <path 
          d="m9.14 8.18-.28-.03a.86.86 0 0 0-.62.18c-.24.16-.91.7-.91 1.71a3 3 0 0 0 .63 1.62c.14.18 1.03 1.51 2.53 2.04 1.25.45 1.5.37 1.77.34.28-.03 1.22-.53 1.31-.94.08-.42.09-.72.07-.81a.94.94 0 0 0-.18-.21 9.77 9.77 0 0 0-1.35-.7c-.19-.04-.33-.06-.46.06-.14.12-.53.53-.65.64-.12.1-.24.12-.43.04a5.5 5.5 0 0 1-1.6-1 6.1 6.1 0 0 1-1.12-1.4c-.12-.2-.01-.31.09-.4.09-.09.2-.23.31-.34.1-.12.14-.2.21-.33a.37.37 0 0 0 0-.34c-.05-.1-.46-1.13-.64-1.55-.16-.42-.33-.35-.44-.35Z" 
          fill="white" 
          stroke="none"
        />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
