import PredictionsTable from "@/components/tables/predictions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IAnnotatedImage } from "@/types";

interface IProps {
  annotatedImages: IAnnotatedImage[];
}
const PredictionsTabCard: React.FC<IProps> = ({ annotatedImages }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Predictions</CardTitle>
        <CardDescription>Your Predictions are ready.</CardDescription>
      </CardHeader>
      <CardContent className="w-full mt-10 space-y-16">
        <PredictionsTable annotatedImages={annotatedImages} />
      </CardContent>
    </Card>
  );
};

export default PredictionsTabCard;
