import axios from "axios";

const token = localStorage.getItem("token");
const headers = {
  "content-type": "application/json",
  "x-auth-token": token,
};

export const createAccountOfUser = async () => {
  try {
    const { data } = await axios.get("users");
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
