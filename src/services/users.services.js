import axios from "axios";

const token = localStorage.getItem("token");
const headers = {
  "content-type": "application/json",
  "x-auth-token": token,
};

export const getAllUsers = async ({ body }) => {
  try {
    const { data } = await axios.post("users", body, { headers });
    return data;
  } catch (error) {
    console.error("Error fetching publications:", error);
    throw error;
  }
};

export const createAccountOfUser = async ({ body }) => {
  try {
    const { data } = await axios.post("users", body);
    return data;
  } catch (error) {
    console.error("Error fetching publications:", error);
    throw error;
  }
};

export const updateInfoOfAccountByToken = async ({ body }) => {
  try {
    const { data } = await axios.put(`users/`, body, { headers });
    return data;
  } catch (error) {
    console.error("Error deleting publication:", error);
    throw error;
  }
};

export const updateInfoOfAccountById = async ({ body, idPost }) => {
  try {
    const { data } = await axios.put(`users/${idPost}`, body, { headers });
    return data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};

export const sendMessageByWhatsApp = async ({ body }) => {
  try {
    const _headers = {
      "content-type": "application/json",
    };
    const { data } = await axios.post(
      "http://localhost:3000/api/whatsapp/send",
      body,
      { headers: _headers }
    );
    return data;
  } catch (error) {
    console.error("Error fetching send message by whatsApp:", error);
    throw error;
  }
};
