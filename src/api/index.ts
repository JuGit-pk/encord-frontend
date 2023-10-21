import { GetPredictResponse, IAnnotatedImage, IImage } from "@/types";

const baseURL = "http://localhost:3500";

// /predict
export const getPredict = async () => {
  try {
    const response = await fetch(`${baseURL}/predict`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const data = (await response.json()) as GetPredictResponse;
    return data;
  } catch (error) {
    throw error;
  }
};

// /images
export const postImage = async (image: IImage) => {
  try {
    const response = await fetch(`${baseURL}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(image),
    });
    if (!response.ok) {
      throw new Error(`Failed to post data: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getImages = async () => {
  try {
    const response = await fetch(`${baseURL}/images`, {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteImageById = async (id: string) => {
  try {
    const response = await fetch(`${baseURL}/images/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete data: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// annotated-images
export const postAnnotatedImage = async (image: IAnnotatedImage) => {
  try {
    const response = await fetch(`${baseURL}/annotated-images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(image),
    });
    if (!response.ok) {
      throw new Error(`Failed to post data: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAnnotatedImages = async () => {
  try {
    const response = await fetch(`${baseURL}/annotated-images`, {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteAnnotatedImageById = async (id: string) => {
  try {
    const response = await fetch(`${baseURL}/annotated-images/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete data: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
