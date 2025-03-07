
import React from "react";

interface ImagePreviewProps {
  imageUrl: string;
}

const ImagePreview = ({ imageUrl }: ImagePreviewProps) => {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 h-48 flex items-center justify-center">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="text-gray-400 text-center p-4">
          Image preview will appear here
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
