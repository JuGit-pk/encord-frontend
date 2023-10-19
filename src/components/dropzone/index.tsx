import React, { useCallback, useState } from "react";
import Image from "next/image";
import { PlusCircle, UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { bytesToMB } from "@/lib/utils";
import { IImage } from "@/types";

interface IDropzone {
  setImages: React.Dispatch<React.SetStateAction<IImage[]>>;
}
const Dropzone: React.FC<IDropzone> = ({ setImages }) => {
  const [fileDropzone, setFileDropzone] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setFileDropzone(file);
    },
    [setFileDropzone]
  );

  const addFileToTable = () => {
    if (fileDropzone) {
      const newImage: IImage = {
        id: uuidv4(),
        url: URL.createObjectURL(fileDropzone),
        filename: fileDropzone.name,
        size: fileDropzone.size,
        timeOfUpload: new Date().toLocaleString(),
      };
      setImages((prevImages) => [...prevImages, newImage]);
      setFileDropzone(null);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [], "image/jpg": [] },
    multiple: false,
  });

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div
        {...getRootProps()}
        className="p-4 border border-dashed rounded-lg cursor-pointer border-primary"
      >
        <input {...getInputProps()} />
        <div>
          {fileDropzone ? (
            <div className="w-full max-w-md h-[120px] relative">
              <Image
                src={URL.createObjectURL(fileDropzone)}
                alt={fileDropzone.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-8 h-8 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG or JPEG
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </>
          )}
        </div>
      </div>
      <div className="flex">
        {fileDropzone && (
          <div className="flex-1 text-xs">
            <p>File: {fileDropzone.name}</p>
            <p>Size: {bytesToMB(fileDropzone.size)}</p>
          </div>
        )}
        <Button
          onClick={addFileToTable}
          disabled={!fileDropzone}
          className="ml-auto"
          size="sm"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add to Table
        </Button>
      </div>
    </div>
  );
};

export default Dropzone;
