import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Dropzone from "@/components/dropzone";
import ImagesTable from "@/components/tables/images";
import { IImage, IPrediction } from "@/types";

interface IImagesTabCard {
  images: IImage[];
  setImages: React.Dispatch<React.SetStateAction<IImage[]>>;
  setPredictions: React.Dispatch<React.SetStateAction<IPrediction[]>>;
}

const ImagesTabCard: React.FC<IImagesTabCard> = ({
  images,
  setImages,
  setPredictions,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
        <CardDescription>
          Your Images will be ready for object detection.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full mt-16 space-y-16">
        <Dropzone setImages={setImages} />
        <ImagesTable
          images={images}
          setImages={setImages}
          setPredictions={setPredictions}
        />
      </CardContent>
    </Card>
  );
};

export default ImagesTabCard;
