import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ImagePreviewProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
  readOnly?: boolean;
}

const ImagePreview = ({ imageUrl, onImageChange, readOnly = true }: ImagePreviewProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 5MB",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      onImageChange(publicUrl);
      
      toast({
        title: "Success",
        description: "Image uploaded successfully"
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onImageChange("");
  };

  return (
    <div className="space-y-3">
      <div className="w-full aspect-[16/9] rounded-md overflow-hidden bg-muted/40 relative">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt="Featured image"
              className="w-full h-full object-cover"
            />
            {!readOnly && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-4">
              <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground mt-2">
                {readOnly ? "Featured image for your post" : "Click below to upload image"}
              </p>
            </div>
          </div>
        )}
      </div>
      
      {!readOnly && (
        <>
          <input
            type="file"
            id="featured-image-upload"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => document.getElementById('featured-image-upload')?.click()}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : imageUrl ? "Change Image" : "Upload Image"}
          </Button>
        </>
      )}
    </div>
  );
};

export default ImagePreview;
