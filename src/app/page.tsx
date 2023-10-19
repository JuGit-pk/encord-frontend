"use client";

import { useState } from "react";
import ImagesTabCard from "@/components/cards/images-tab";
import PredictionsTabCard from "@/components/cards/predictions-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IImage, IPrediction } from "@/types";
import { ModeToggle } from "@/components/theme/button";

export default function Home() {
  const [images, setImages] = useState<IImage[]>([]);
  const [predictions, setPredictions] = useState<IPrediction[]>([]);

  return (
    <main className="flex items-start justify-center w-screen h-screen p-10">
      <ModeToggle />
      <Tabs defaultValue="images" className="w-full max-w-5xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="images" defaultChecked>
            Images
          </TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>
        <TabsContent value="images">
          <ImagesTabCard
            images={images}
            setImages={setImages}
            setPredictions={setPredictions}
          />
        </TabsContent>
        <TabsContent value="predictions">
          <PredictionsTabCard
            predictions={predictions}
            setPredictions={setPredictions}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}
