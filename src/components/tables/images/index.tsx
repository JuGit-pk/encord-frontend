import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IAnnotatedImage, IImage } from "@/types";
import { bytesToMB } from "@/lib/utils";
import RowActions from "./row-action";
import { deleteImageById, getPredict, postAnnotatedImage } from "@/api";
import { useToast } from "@/components/ui/use-toast";

interface IProps {
  images: IImage[];
}
const ImagesTable: React.FC<IProps> = ({ images }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const handleRemoveImage = async (id: string) => {
    await deleteImageById(id);
  };
  const handlePredictImage = async (
    image: IImage,
    title: string,
    description: string
  ) => {
    try {
      setIsLoading(true);
      const response = await getPredict();
      // now we are getting the same object coordinates for all images as assumption
      // but it will be different for each image by using the image id later
      const newAnnotatedImage: IAnnotatedImage = {
        id: image.id,
        title,
        description,
        timeOfPrediction: new Date().toLocaleString(),
        imageUrl: image.url,
        predictions: response?.predictions || [],
      };

      // post the prediction to the server
      await postAnnotatedImage(newAnnotatedImage);

      // using the states becuase we are not getting the predictions from the server
      // and we are not including the react-query here so that we are implementing the simple logic
      await deleteImageById(image.id);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: `${(error as Error).message}`,
      });
      console.log(error);
    }
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
        {images.map((image) => (
          <TableRow key={image.id}>
            <TableCell>{image.filename}</TableCell>
            <TableCell>{bytesToMB(image.size)}</TableCell>
            <TableCell>{image.timeOfUpload}</TableCell>
            <TableCell className="flex items-center space-x-4">
              <RowActions
                onRemove={() => handleRemoveImage(image.id)}
                onPredict={({ title, description }) =>
                  handlePredictImage(image, title, description)
                }
                isLoading={isLoading}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ImagesTable;
