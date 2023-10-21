"use client";

import ImagesTabCard from "@/components/cards/images-tab";
import PredictionsTabCard from "@/components/cards/predictions-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IImage, IAnnotatedImage } from "@/types";
import { ModeToggle } from "@/components/theme/button";

interface IProps {
  images: IImage[];
  annotatedImages: IAnnotatedImage[];
}
export default function MainTabs({ annotatedImages, images }: IProps) {
  return (
    <>
      <ModeToggle />
      <Tabs defaultValue="images" className="w-full max-w-5xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="images" defaultChecked>
            Images
          </TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>
        <TabsContent value="images">
          <ImagesTabCard images={images} />
        </TabsContent>
        <TabsContent value="predictions">
          <PredictionsTabCard annotatedImages={annotatedImages} />
        </TabsContent>
      </Tabs>
    </>
  );
}
