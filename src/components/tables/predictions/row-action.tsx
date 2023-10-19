import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IPrediction } from "@/types";
import { XIcon } from "lucide-react";

interface IRowAction {
  onRemove: () => void;
  prediction: IPrediction;
}

interface IRowAction {
  onRemove: () => void;
  prediction: IPrediction;
}

const RowActions: React.FC<IRowAction> = ({ onRemove, prediction }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>View</Button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>{prediction.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex items-center justify-center">
            <Image
              src={prediction.imageUrl}
              alt={prediction.title}
              className="object-contain w-full lg:max-h-[30rem] xl:max-h-[50rem]"
              width={4500}
              height={4500}
            />
          </DialogDescription>
        </DialogContent>
      </Dialog>
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
