import axios from "axios";

const token = localStorage.getItem("token");
const headers = {
  "content-type": "application/json",
  "x-auth-token": token,
};

export const getAllPrayes = async () => {
  try {
    const { data } = await axios.get("oracion", { headers });
    return data;
  } catch (error) {
    console.error("Error fetching pray:", error);
    throw error;
  }
};

export const savePrayes = async ({ body, idUser }) => {
  try {
    const { data } = await axios.post(`oracion/${idUser}`, body);
    return data;
  } catch (error) {
    console.error("Error fetching pray:", error);
    throw error;
  }
};

export const deletePrays = async ({ idPray }) => {
  try {
    const { data } = await axios.delete(`oracion/${idPray}`, { headers });
    return data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};
