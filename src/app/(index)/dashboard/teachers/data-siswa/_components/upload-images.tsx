'use client';

import React, { ChangeEvent, useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

interface UploadImagesProps {
  initialImageUrl?: string;
}

export default function UploadImages({ initialImageUrl }: UploadImagesProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState(
    initialImageUrl || '/design/placeholder.svg'
  );

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="grid w-1/2 items-center gap-2">
      <Label>Unggah Foto</Label>
      <Image
        alt="Foto siswa"
        className="aspect-square size-full rounded-md object-cover"
        height={300}
        width={300}
        src={previewUrl}
        priority
      />

      <div className="space-y-1">
        <button
          type="button"
          onClick={handleClick}
          className="flex aspect-square size-1/4 items-center justify-center rounded-md border border-dashed"
        >
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Upload</span>
        </button>
        <input
          ref={fileInputRef}
          onChange={handleImageChange}
          type="file"
          name="imgUrl"
          className="hidden"
          accept="image/*"
        />
      </div>
    </div>
  );
}
