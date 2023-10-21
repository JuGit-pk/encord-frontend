export interface IImage {
  id: string;
  url: string | ArrayBuffer | null;
  filename: string;
  size: number;
  timeOfUpload: string;
}
export interface IPredict {
  bbox: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  };
  label: string;
  score: string;
}
export interface IAnnotatedImage {
  id: string;
  imageUrl: string | ArrayBuffer | null;
  title: string;
  description: string;
  timeOfPrediction: string;
  predictions: IPredict[];
}
export interface IPredictImageForm {
  title: string;
  description: string;
}
export interface GetPredictResponse {
  description: string;
  predictions: IPredict[];
}
