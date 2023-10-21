import { useEffect, useRef, useState } from "react";
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
            <AnnotatedImage annotatedImage={annotatedImage} />
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

const AnnotatedImage: React.FC<{ annotatedImage: IAnnotatedImage }> = ({
  annotatedImage,
}) => {
  const imgRef = useRef(null);

  // Calculate scale factors
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  const handleImageLoad = () => {
    if (imgRef.current) {
      const { naturalWidth, clientWidth, naturalHeight, clientHeight } =
        imgRef.current;
      setScaleX(clientWidth / naturalWidth);
      setScaleY(clientHeight / naturalHeight);
    }
  };

  useEffect(() => {
    handleImageLoad();
  }, [imgRef]);

  return (
    <div className="relative">
      <Image
        width={2000}
        height={2000}
        ref={imgRef}
        src={String(annotatedImage.imageUrl)}
        onLoad={handleImageLoad}
        alt={annotatedImage.title}
      />
      {annotatedImage.predictions.map((prediction, index) => (
        <div
          key={index}
          className="rounded-md absolute border-2 border-[#FF5733] bg-[#FF5733] bg-opacity-10"
          style={{
            left: prediction.bbox.x1 * scaleX,
            top: prediction.bbox.y1 * scaleY,
            width: (prediction.bbox.x2 - prediction.bbox.x1) * scaleX,
            height: (prediction.bbox.y2 - prediction.bbox.y1) * scaleY,
          }}
        >
          <span className="text-white bg-black rounded-bl-md rounded-tr-md px-2 py-1 absolute bottom-0 right-0 font-mono text-xs">
            {prediction.label} ({(+prediction.score * 100).toFixed(2)}%)
          </span>
        </div>
      ))}
    </div>
  );
};
