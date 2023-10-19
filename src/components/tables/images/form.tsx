import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IPredictImageForm } from "@/types";

interface IForm {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: IPredictImageForm;
}
const Form: React.FC<IForm> = ({ onChange, formData }) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid items-center grid-cols-4 gap-4">
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <Input
          id="title"
          name="title"
          className="col-span-3"
          value={formData.title}
          onChange={onChange}
        />
      </div>
      <div className="grid items-center grid-cols-4 gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Input
          id="description"
          name="description"
          className="col-span-3"
          value={formData.description}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Form;
