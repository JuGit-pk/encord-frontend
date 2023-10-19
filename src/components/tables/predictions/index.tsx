import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IPrediction } from "@/types";
import { Button } from "@/components/ui/button";
import RowActions from "./row-action";

interface IPredictionsTable {
  predictions: IPrediction[];
  setPredictions: React.Dispatch<React.SetStateAction<IPrediction[]>>;
}
const PredictionsTable: React.FC<IPredictionsTable> = ({
  predictions,
  setPredictions,
}) => {
  const handleRemovePrediction = (idx: number) =>
    setPredictions((prevPrediction) =>
      prevPrediction.filter((_, i) => i !== idx)
    );
  return (
    <Table className="overflow-auto">
      <TableCaption>List of Complete Predictions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Time of Prediction</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {predictions.map((prediction, idx) => (
          <TableRow key={idx}>
            <TableCell className="max-w-[180px] overflow-auto">
              {prediction.title}
            </TableCell>
            <TableCell className="max-w-[180px] overflow-auto">
              {prediction.description}
            </TableCell>
            <TableCell>{prediction.timeOfPrediction}</TableCell>
            <TableCell className="flex items-center space-x-4">
              <RowActions
                onRemove={() => handleRemovePrediction(idx)}
                prediction={prediction}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PredictionsTable;
