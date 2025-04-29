import axios from "axios";
import {
  REACT_APP_API_CLOUDINARY,
  REACT_APP_API_CLOUDINARY_KEY,
} from "../utils/values";

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
