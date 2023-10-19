import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IImage, IPrediction } from "@/types";
import { bytesToMB } from "@/lib/utils";
import RowActions from "./row-action";

interface IImagesTable {
  images: IImage[];
  setImages: React.Dispatch<React.SetStateAction<IImage[]>>;
  setPredictions: React.Dispatch<React.SetStateAction<IPrediction[]>>;
}
const ImagesTable: React.FC<IImagesTable> = ({
  images,
  setImages,
  setPredictions,
}) => {
  const handleRemoveImage = (idx: number) =>
    setImages((prevImages) => prevImages.filter((_, i) => i !== idx));

  const handlePredictImage = (
    image: IImage,
    title: string,
    description: string
  ) => {
    const newPrediction: IPrediction = {
      title,
      description,
      timeOfPrediction: new Date().toLocaleString(),
      imageUrl: image.url,
    };

    setPredictions((prevPredictions) => [...prevPredictions, newPrediction]);
    setImages((prevImages) => prevImages.filter((img) => img.id !== image.id));
  };

  return (
    <Table className="overflow-auto">
      <TableCaption>List of Uploaded Images</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Filename</TableHead>
          <TableHead>Size (MB)</TableHead>
          <TableHead>Time of Upload</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {images.map((image, idx) => (
          <TableRow key={idx}>
            <TableCell>{image.filename}</TableCell>
            <TableCell>{bytesToMB(image.size)}</TableCell>
            <TableCell>{image.timeOfUpload}</TableCell>
            <TableCell className="flex items-center space-x-4">
              <RowActions
                onRemove={() => handleRemoveImage(idx)}
                onPredict={({ title, description }) =>
                  handlePredictImage(image, title, description)
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ImagesTable;
