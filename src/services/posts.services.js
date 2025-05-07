import axios from "axios";

const token = localStorage.getItem("token");
const headers = {
  "content-type": "application/json",
  "x-auth-token": token,
};

export const getAllPosts = async () => {
  //Context Post
  try {
    const { data } = await axios.get("posts");
    return data;
  } catch (error) {
    console.error("Error fetching publications:", error);
    throw error;
  }
};

export const getUserById = async ({ userId }) => {
  try {
    const { data } = await axios.get(`posts/${userId}`);
    return data;
  } catch (error) {
    console.error("Error get user by id:", error);
    throw error;
  }
};

export const getPostById = async ({ idPost }) => {
  try {
    const { data } = await axios.get(`posts/user/${idPost}`);
    return data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};

export const getPostByToken = async () => {
  try {
    const { data } = await axios.get(`posts/user/getAll`, { headers });
    return data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};

export const savePost = async ({ body }) => {
  try {
    const { data } = await axios.post("posts", body, { headers });
    return data;
  } catch (error) {
    console.error("Error fetching publications:", error);
    throw error;
  }
};

export const saveCommentInPost = async ({ body, idPost }) => {
  try {
    const { data } = await axios.post(`posts/${idPost}/comment`, body);
    return data;
  } catch (error) {
    console.error("Error get user by id:", error);
    throw error;
  }
};

export const deletePosts = async ({ idPost }) => {    
  try {
    const { data } = await axios.delete(`posts/${idPost}`, {
      headers,
    });
    return data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};
