import axios from "axios";

const token = localStorage.getItem("token");
const headers = { "x-auth-token": token };

export const getUserByToken = async () => {
  try {
    const { data } = await axios.get(`auth`, { headers });
    return data?.user;
  } catch (error) {
    console.error("Error deleting publication:", error);
    throw error;
  }
};

export const authentication = async ({ body }) => {
  try {
    const { data } = await axios.post("auth", body);
    return data;
  } catch (error) {
    console.error("Error fetching publications:", error);
    throw error;
  }
};
