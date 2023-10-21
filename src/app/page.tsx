import { getAnnotatedImages, getImages } from "@/api";
import MainTabs from "@/components/tabs";

export default async function Home() {
  const images = await getImages();
  const annotatedImages = await getAnnotatedImages();
  return (
    <main className="flex items-start justify-center w-screen h-screen p-10">
      <MainTabs images={images} annotatedImages={annotatedImages} />
    </main>
  );
}
