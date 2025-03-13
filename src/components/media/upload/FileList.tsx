
import React from "react";
import FileItem from "./FileItem";

interface FileListProps {
  files: File[];
  onRemoveFile: (index: number) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onRemoveFile }) => {
  if (files.length === 0) return null;

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted/30 px-4 py-2 border-b">
        <h4 className="text-sm font-medium">Files to upload ({files.length})</h4>
      </div>
      <ul className="divide-y divide-border max-h-60 overflow-y-auto">
        {files.map((file, index) => (
          <FileItem
            key={index}
            file={file}
            onRemove={() => onRemoveFile(index)}
          />
        ))}
      </ul>
    </div>
  );
};

export default FileList;
