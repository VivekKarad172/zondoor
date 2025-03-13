
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadProgressProps {
  uploadProgress: number;
  isLoading: boolean;
  onUpload: () => void;
  onCancel: () => void;
  filesCount: number;
}

const UploadProgress: React.FC<UploadProgressProps> = ({
  uploadProgress,
  isLoading,
  onUpload,
  onCancel,
  filesCount,
}) => {
  const showProgress = uploadProgress > 0;
  const isUploading = isLoading || uploadProgress > 0;
  const isComplete = uploadProgress === 100;

  return (
    <div className="space-y-4">
      {showProgress && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} />
        </div>
      )}
      
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={onUpload}
          disabled={filesCount === 0 || isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : isComplete ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Uploaded
            </>
          ) : (
            "Upload"
          )}
        </Button>
      </div>
    </div>
  );
};

export default UploadProgress;
