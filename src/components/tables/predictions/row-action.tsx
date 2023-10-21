import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IAnnotatedImage } from "@/types";
import { XIcon } from "lucide-react";

interface IRowAction {
  onRemove: () => void;
  annotatedImage: IAnnotatedImage;
}

interface IRowAction {
  onRemove: () => void;
  annotatedImage: IAnnotatedImage;
}

const RowActions: React.FC<IRowAction> = ({ onRemove, annotatedImage }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>View</Button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>{annotatedImage.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex items-center justify-center">
            <Image
              src={String(annotatedImage.imageUrl)}
              alt={annotatedImage.title}
              className="object-contain w-full lg:max-h-[30rem] xl:max-h-[50rem]"
              width={4500}
              height={4500}
            />
          </DialogDescription>
        </DialogContent>
      </Dialog>
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
