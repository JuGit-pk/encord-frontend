import PredictionsTable from "@/components/tables/predictions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IPrediction } from "@/types";

interface IPredictionsTabCard {
  predictions: IPrediction[];
  setPredictions: React.Dispatch<React.SetStateAction<IPrediction[]>>;
}
const PredictionsTabCard: React.FC<IPredictionsTabCard> = ({
  predictions,
  setPredictions,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Predictions</CardTitle>
        <CardDescription>Your Predictions are ready.</CardDescription>
      </CardHeader>
      <CardContent className="w-full mt-10 space-y-16">
        <PredictionsTable
          predictions={predictions}
          setPredictions={setPredictions}
        />
      </CardContent>
    </Card>
  );
};

export default PredictionsTabCard;
