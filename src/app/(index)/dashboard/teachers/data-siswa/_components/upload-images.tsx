import React, { ChangeEvent, useRef } from 'react';
import { Upload } from 'lucide-react';
import Image from 'next/image';

export default function UploadImages() {
  const ref = useRef<HTMLInputElement>(null);
  const thumbnailRef = useRef<HTMLImageElement>(null);

  const openFolder = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!thumbnailRef.current) {
      return;
    }

    if (e.target.files && e.target.files.length > 0) {
      thumbnailRef.current.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  return (
    <div className="grid w-1/2 items-center gap-2">
      <Image
        alt="Product image"
        className="aspect-square size-full rounded-md object-cover"
        height="300"
        src="/design/placeholder.svg"
        width="300"
        ref={thumbnailRef}
      />
      <div className="space-y-1">
        <button
          type="button"
          onClick={openFolder}
          className="flex aspect-square size-1/4 items-center justify-center rounded-md border border-dashed"
        >
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Upload</span>
        </button>
        <input
          ref={ref}
          onChange={onChange}
          type="file"
          name="imgUrl"
          className="hidden"
          accept="images/*"
          multiple
        />
      </div>
    </div>
  );
}
