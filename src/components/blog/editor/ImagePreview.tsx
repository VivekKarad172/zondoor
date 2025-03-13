
import React from "react";

interface ImagePreviewProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
  readOnly?: boolean;
}

const ImagePreview = ({ imageUrl, onImageChange, readOnly = true }: ImagePreviewProps) => {
  return (
    <div className="w-full aspect-[16/9] rounded-md overflow-hidden bg-muted/40">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Featured image"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-4">
            <div className="h-10 w-10 mx-auto text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Featured image for your post</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
