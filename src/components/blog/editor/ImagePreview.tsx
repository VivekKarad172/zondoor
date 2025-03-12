
import React from "react";
import ImageSelector from "@/components/media/ImageSelector";

interface ImagePreviewProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
}

const ImagePreview = ({ imageUrl, onImageChange }: ImagePreviewProps) => {
  return (
    <ImageSelector
      value={imageUrl}
      onChange={onImageChange}
      aspectRatio={16/9}
      placeholder="Choose a featured image for your post"
      className="h-full"
    />
  );
};

export default ImagePreview;
