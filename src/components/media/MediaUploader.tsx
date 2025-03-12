import React, { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMedia } from "@/contexts/media";
import { cn } from "@/lib/utils";
import { Upload, X, Image, File, Check, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface MediaUploaderProps {
  isOpen: boolean;
  onClose: () => void;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({ isOpen, onClose }) => {
  const { addMedia, isLoading } = useMedia();
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (fileList: File[]) => {
    const acceptedFiles = fileList.filter(file => 
      file.type.startsWith("image/") || 
      file.type.startsWith("video/") ||
      file.type.startsWith("application/pdf")
    );
    
    setFiles(prev => [...prev, ...acceptedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    // Simulate progress
    const timer = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(timer);
          return prev;
        }
        return prev + 10;
      });
    }, 300);
    
    try {
      await addMedia(files);
      clearInterval(timer);
      setUploadProgress(100);
      
      // Reset after upload
      setTimeout(() => {
        setFiles([]);
        setUploadProgress(0);
        onClose();
      }, 1000);
    } catch (error) {
      clearInterval(timer);
      setUploadProgress(0);
      console.error("Upload failed:", error);
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <Image className="h-4 w-4" />;
    }
    return <File className="h-4 w-4" />;
  };

  const getThumbnail = (file: File) => {
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Media</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center",
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
            )}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-medium">
              Drag and drop files here
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Or click to browse for files
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => fileInputRef.current?.click()}
            >
              Select Files
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              multiple
              accept="image/*,video/*,application/pdf"
              className="hidden"
            />
          </div>
          
          {files.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/30 px-4 py-2 border-b">
                <h4 className="text-sm font-medium">Files to upload ({files.length})</h4>
              </div>
              <ul className="divide-y divide-border max-h-60 overflow-y-auto">
                {files.map((file, index) => (
                  <li key={index} className="px-4 py-2 flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-muted flex items-center justify-center overflow-hidden shrink-0">
                      {getThumbnail(file) ? (
                        <img 
                          src={getThumbnail(file)!} 
                          alt={file.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        getFileIcon(file)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(0)} KB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpload}
            disabled={files.length === 0 || isLoading || uploadProgress > 0}
          >
            {isLoading || uploadProgress > 0 ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : uploadProgress === 100 ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Uploaded
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaUploader;
