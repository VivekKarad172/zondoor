
import React from "react";
import ImageSelector from "@/components/media/ImageSelector";

interface ImagePreviewProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
  readOnly?: boolean;
}

const ImagePreview = ({ imageUrl, onImageChange, readOnly = true }: ImagePreviewProps) => {
  return (
    <ImageSelector
      value={imageUrl}
      onChange={onImageChange}
      aspectRatio={16/9}
      placeholder="Featured image for your post"
      className="h-full"
      readOnly={readOnly}
    />
  );
};

export default ImagePreview;
