import axios from "axios";

const token = localStorage.getItem("token");
const headers = {
  "Content-Type": "application/json",
  "x-auth-token": token,
};

// GET /
export const getAllProjects = async () => {
  try {
    const { data } = await axios.get("/projects", { headers });
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

// GET /
export const getAllProjectsByToken = async () => {
  try {
    const { data } = await axios.get("/projects", { headers });
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

// GET /getAllById
export const getItAllMine = async () => {
  try {
    const { data } = await axios.get(`/projects/getItAllMine`, {
      headers,
    });
    return data;
  } catch (error) {
    console.error("Error fetching projectsers by user:", error);
    throw error;
  }
};

// GET /getAllById/:idUser
export const getProjectsByUserId = async ({idUser}) => {
  try {
    const { data } = await axios.get(`/projects/getAllById/${idUser}`, {
      headers,
    });
    return data;
  } catch (error) {
    console.error("Error fetching projectsers by user:", error);
    throw error;
  }
};

// POST /addProject
export const addProject = async ({body}) => {
  try {
    const { data } = await axios.post("/projects/addProject", body, {
      headers,
    });
    return data;
  } catch (error) {
    console.error("Error adding projectser:", error);
    throw error;
  }
};

// POST /addContributor
export const addContributorToProject = async ({ ProjectId, ContributorId }) => {
  try {
    const { data } = await axios.post(
      "/projects/addContributor",
      { ProjectId, ContributorId },
      { headers }
    );
    return data;
  } catch (error) {
    console.error("Error adding contributor:", error);
    throw error;
  }
};

// PATCH /changeState
export const changeProjectState = async ({ ProjectId, State }) => {
  try {
    const { data } = await axios.patch(
      "/projects/changeState",
      { ProjectId, State },
      { headers }
    );
    return data;
  } catch (error) {
    console.error("Error changing state:", error);
    throw error;
  }
};

// DELETE /:idDelete
export const deleteProject = async ({idDelete}) => {
  try {
    const { data } = await axios.delete(`/projects/${idDelete}`, { headers });
    return data;
  } catch (error) {
    console.error("Error deleting projectser:", error);
    throw error;
  }
};
