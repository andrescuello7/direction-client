import axios from "axios";

const token = localStorage.getItem("token");

const headers = {
  "content-type": "application/json",
  "x-auth-token": token,
};

export const getAllPosts = async () => {
  try {
    const { data } = await axios.get("publicacion");
    return data;
  } catch (error) {
    console.error("Error fetching publications:", error);
    throw error;
  }
};

export const getUserById = async ({ userId }) => {
  try {
    const { data } = await axios.get(`publicacion/${userId}`);
    return data;
  } catch (error) {
    console.error("Error get user by id:", error);
    throw error;
  }
};

export const getPostById = async ({ idPost }) => {
  try {
    const { data } = await axios.get(`publicacion/usuario/${idPost}`);
    return data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};

export const savePost = async ({ body }) => {
  try {
    const { data } = await axios.post("publicacion", body, { headers });
    return data;
  } catch (error) {
    console.error("Error fetching publications:", error);
    throw error;
  }
};

export const saveCommentInPost = async ({ body, idPost }) => {
  try {
    const { data } = await axios.post(`publicacion/${idPost}/comment`, body);
    return data;
  } catch (error) {
    console.error("Error get user by id:", error);
    throw error;
  }
};

export const deletePosts = async ({ idPost }) => {    
  try {
    const { data } = await axios.delete(`publicacion/${idPost}`, {
      headers,
    });
    return data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};
