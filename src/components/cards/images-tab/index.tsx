import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Dropzone from "@/components/dropzone";
import ImagesTable from "@/components/tables/images";
import { IImage } from "@/types";

interface IProps {
  images: IImage[];
}

const ImagesTabCard: React.FC<IProps> = ({ images }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
        <CardDescription>
          Your Images will be ready for object detection.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full mt-16 space-y-16">
        <Dropzone />
        <ImagesTable images={images} />
      </CardContent>
    </Card>
  );
};

export default ImagesTabCard;
