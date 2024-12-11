import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  onImageClear: () => void;
  selectedImage: File | null;
}

export function ImageUploader({
  onImageSelect,
  onImageClear,
  selectedImage,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && file.size <= 5 * 1024 * 1024) {
        onImageSelect(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  });

  const handleClear = () => {
    onImageClear();
    setPreview(null);
  };

  if (preview) {
    return (
      <div className="relative inline-block">
        <img
          src={preview}
          alt="Preview"
          className="h-20 w-20 rounded object-cover"
        />
        <Button
          variant="destructive"
          size="icon"
          className="absolute -right-2 -top-2"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className="cursor-pointer rounded border-2 border-dashed border-muted p-4 hover:border-primary"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        <ImageIcon className="h-6 w-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          {isDragActive
            ? 'Drop image here'
            : 'Drag & drop or click to select image'}
        </p>
      </div>
    </div>
  );
}