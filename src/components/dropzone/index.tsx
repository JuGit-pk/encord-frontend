import React, { useCallback, useState } from "react";
import Image from "next/image";
import Dropzone from "react-dropzone";
import { PlusCircle, UploadCloud } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { bytesToMB } from "@/lib/utils";
import { IImage } from "@/types";
import { useToast } from "../ui/use-toast";

interface IDropzone {
  setImages: React.Dispatch<React.SetStateAction<IImage[]>>;
}
const FileInput: React.FC<IDropzone> = ({ setImages }) => {
  const [fileDropzone, setFileDropzone] = useState<File | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const fileType = file.type;
      if (
        fileType === "image/png" ||
        fileType === "image/jpg" ||
        fileType === "image/jpeg"
      ) {
        setFileDropzone(file);
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a valid image file",
        });
      }
    },
    [setFileDropzone, toast]
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
  return (
    <div className="max-w-md mx-auto space-y-4">
      <Dropzone
        onDrop={onDrop}
        maxFiles={1}
        // note: acepts prop giving build errors, so for that time we are checking the file type in onDrop function
        // accept={{
        //   "image/*": [".png", ".jpeg", ".jpg"],
        // }}
      >
        {({ getRootProps, getInputProps }) => (
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
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-8 h-8 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG or JPEG
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </Dropzone>
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

export default FileInput;
