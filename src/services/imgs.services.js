import axios from "axios";
import {
  REACT_APP_API_CLOUDINARY,
  REACT_APP_API_CLOUDINARY_KEY,
} from "../utils/values";

const token = localStorage.getItem("token");
const headers = {
  "content-type": "application/json",
  "x-auth-token": token,
};

export const uploadImage = async ({ event }) => {
  try {
    const file = event.target.files[0];
    const body = new FormData();
    body.append("file", file);
    body.append("upload_preset", REACT_APP_API_CLOUDINARY_KEY);

    const { data } = await axios.post(
      `${REACT_APP_API_CLOUDINARY}/v1_1/five-drive/upload`,
      body
    );
    return data?.url;
  } catch (error) {
    console.error("Error upload:", error);
  }
};

export const qrGenerate = async ({ idProfile }) => {
  try {
    const { data } = await axios.post(`usuario/qr/generate/${idProfile}`, {
      headers,
    });
    return data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};
