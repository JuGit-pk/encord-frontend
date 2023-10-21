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
import { Loader2, XIcon } from "lucide-react";

interface IImagesAction {
  isLoading?: boolean;
  onRemove: () => void;
  onPredict: (formData: IPredictImageForm) => void;
}

const RowActions: React.FC<IImagesAction> = ({
  onRemove,
  onPredict,
  isLoading,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
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
        <Button onClick={() => setIsDialogOpen(true)} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          PREDICT
        </Button>
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
              <Button variant="outline" className="w-20">
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
      <Dialog open={isAlertOpen} onOpenChange={() => setIsAlertOpen(false)}>
        <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          onClick={() => setIsAlertOpen(true)}
        >
          <XIcon size={24} />
        </Button>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure ?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="w-20">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={() => {
                onRemove();
                setIsAlertOpen(false);
              }}
              variant="destructive"
              className="w-20"
            >
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RowActions;
