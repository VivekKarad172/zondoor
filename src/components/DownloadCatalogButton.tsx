
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface DownloadCatalogButtonProps {
  variant?: "primary" | "secondary" | "white" | "icon";
  size?: "sm" | "md" | "lg";
  className?: string;
  catalogId?: string;
}

const DownloadCatalogButton = ({
  variant = "primary",
  size = "md",
  className,
  catalogId = "1lCoKIPFn63So99eKhnYt8w49DXo9_UAa"
}: DownloadCatalogButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    try {
      setIsDownloading(true);
      // Use the direct download URL format for Google Drive
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${catalogId}`;
      
      // Open in new tab for better download experience
      window.open(downloadUrl, "_blank");
      
      // Show success dialog
      setIsOpen(true);
      setIsDownloading(false);
    } catch (error) {
      console.error("Download error:", error);
      setIsDownloading(false);
    }
  };

  // Style mappings based on variant
  const buttonStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    white: "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30",
    icon: "p-2 bg-primary/10 text-primary hover:bg-primary/20"
  };

  // Size mappings
  const sizeStyles = {
    sm: "text-sm px-3 py-1.5",
    md: "px-5 py-2.5",
    lg: "text-lg px-6 py-3"
  };

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={cn(
          buttonStyles[variant],
          sizeStyles[size],
          "rounded-md font-medium inline-flex items-center",
          "transition-all duration-300 transform hover:translate-y-[-2px]",
          "shadow-md",
          isDownloading && "opacity-70 cursor-not-allowed",
          className
        )}
        type="button"
      >
        <Download size={size === "sm" ? 16 : size === "lg" ? 24 : 20} className="mr-2" />
        {isDownloading ? "Downloading..." : "Download Catalog"}
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Catalog Download</DialogTitle>
            <DialogDescription>
              Your catalog download has started. If it doesn't begin automatically, 
              please click the button below to try again.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
            <Button onClick={handleDownload}>Download Again</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DownloadCatalogButton;
