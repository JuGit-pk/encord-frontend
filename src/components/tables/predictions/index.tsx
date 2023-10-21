import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { IAnnotatedImage } from "@/types";
import RowActions from "./row-action";
import { deleteAnnotatedImageById } from "@/api";

interface IProps {
  annotatedImages: IAnnotatedImage[];
}
const PredictionsTable: React.FC<IProps> = ({ annotatedImages }) => {
  const { toast } = useToast();
  const handleRemoveAnnotatedImage = async (id: string) => {
    try {
      await deleteAnnotatedImageById(id);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: `${(error as Error).message}`,
      });
    }
  };
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
        {annotatedImages.map((annotatedImage) => (
          <TableRow key={annotatedImage.id}>
            <TableCell className="max-w-[180px] overflow-auto">
              {annotatedImage.title}
            </TableCell>
            <TableCell className="max-w-[180px] overflow-auto">
              {annotatedImage.description}
            </TableCell>
            <TableCell>{annotatedImage.timeOfPrediction}</TableCell>
            <TableCell className="flex items-center space-x-4">
              <RowActions
                onRemove={() => handleRemoveAnnotatedImage(annotatedImage.id)}
                annotatedImage={annotatedImage}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PredictionsTable;
