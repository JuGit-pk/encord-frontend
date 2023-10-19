import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Form from "./form";
import { IPredictImageForm } from "@/types";
import { XIcon } from "lucide-react";

interface IImagesAction {
  onRemove: () => void;
  onPredict: (formData: IPredictImageForm) => void;
}

const RowActions: React.FC<IImagesAction> = ({ onRemove, onPredict }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<IPredictImageForm>({
    title: "",
    description: "",
  });

  const { toast } = useToast();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSave = () => {
    onPredict(formData);
    setFormData({
      title: "",
      description: "",
    });
    setIsDialogOpen(false);
    toast({
      title: "Prediction Saved",
      description: `Your prediction ${formData.title} has been saved.`,
    });
  };

  return (
    <>
      {/* predict button */}
      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
        <Button onClick={() => setIsDialogOpen(true)}>PREDICT</Button>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Predict</DialogTitle>
            <DialogDescription>
              Enter Title and Description for image. Click save when you are
              done.
            </DialogDescription>
          </DialogHeader>
          <Form onChange={handleInputChange} formData={formData} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="destructive" className="w-20">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={() => handleSave()} className="w-20">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* remove row button */}
      <Button
        variant="outline"
        className="rounded-full"
        onClick={onRemove}
        size="icon"
      >
        <XIcon size={24} />
      </Button>
    </>
  );
};

export default RowActions;
