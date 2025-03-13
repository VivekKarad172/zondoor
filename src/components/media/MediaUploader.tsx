
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMedia } from "@/contexts/media";
import UploadArea from "./upload/UploadArea";
import FileList from "./upload/FileList";
import UploadProgress from "./upload/UploadProgress";

interface MediaUploaderProps {
  isOpen: boolean;
  onClose: () => void;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({ isOpen, onClose }) => {
  const { addMedia, isLoading } = useMedia();
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Media</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <UploadArea
            isDragging={isDragging}
            handleDragEnter={handleDragEnter}
            handleDragLeave={handleDragLeave}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleFileInputChange={handleFileInputChange}
          />
          
          <FileList 
            files={files}
            onRemoveFile={removeFile}
          />
          
          <UploadProgress
            uploadProgress={uploadProgress}
            isLoading={isLoading}
            onUpload={handleUpload}
            onCancel={onClose}
            filesCount={files.length}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaUploader;
