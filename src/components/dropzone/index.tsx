import React, { useCallback, useState } from "react";
import Image from "next/image";
import Dropzone from "react-dropzone";
import { Loader2, PlusCircle, UploadCloud } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { bytesToMB } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import { postImage } from "@/api";

const FileInput = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileDropzone, setFileDropzone] = useState<File | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsLoading(true);
      const file = acceptedFiles[0];
      const fileType = file.type;
      const fileSize = file.size;
      const maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes
      if (fileSize > maxFileSize) {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 5 MB",
        });
        return;
      }
      if (
        fileType === "image/png" ||
        fileType === "image/jpg" ||
        fileType === "image/jpeg"
      ) {
        setIsLoading(false);
        setFileDropzone(file);
      } else {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a valid image file",
        });
      }
    },
    [setFileDropzone, toast]
  );

  const addFileToTable = async () => {
    if (fileDropzone) {
      const reader = new FileReader();

      reader.onload = async () => {
        const base64Image = reader.result; // This is the Base64-encoded image data

        // we are using images in the base64 format, so that we donot need to upload the images in the cloudinary or any other cloud storage
        const newImage = {
          id: uuidv4(),
          url: base64Image, // Set the Base64-encoded image data as the URL
          filename: fileDropzone.name,
          size: fileDropzone.size,
          timeOfUpload: new Date().toLocaleString(),
        };

        await postImage(newImage);
        setFileDropzone(null);
      };

      reader.readAsDataURL(fileDropzone);
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
                    className="object-contain"
                    src={URL.createObjectURL(fileDropzone)}
                    alt={fileDropzone.name}
                    fill
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
                    PNG, JPG or JPEG up to 5MB
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
          disabled={!fileDropzone || isLoading}
          className="ml-auto"
          size="sm"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <PlusCircle className="w-4 h-4 mr-2" />
          )}
          Add to Table
        </Button>
      </div>
    </div>
  );
};

export default FileInput;
