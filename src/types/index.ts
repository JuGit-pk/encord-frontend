export interface IImage {
  id: string;
  url: string;
  filename: string;
  size: number;
  timeOfUpload: string;
}
export interface IPredictedObject {
  bbox: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  };
  label: string;
  score: string;
}
export interface IPrediction {
  title: string;
  description: string;
  timeOfPrediction: string;
  imageUrl: string;
}
export interface IPredictImageForm {
  title: string;
  description: string;
}
