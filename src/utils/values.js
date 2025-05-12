// export const exampleImage = "https://avatars.githubusercontent.com/u/11158978?v=4";
export const exampleImage =
  "https://avatars.githubusercontent.com/u/98579886?v=4";
export const REACT_APP_API_CLOUDINARY = process.env.REACT_APP_API_CLOUDINARY;
export const REACT_APP_API_CLOUDINARY_KEY =
  process.env.REACT_APP_API_CLOUDINARY_KEY;
export const REACT_APP_SERVER_URL_PRODUCTION =
  process.env.REACT_APP_SERVER_URL_PRODUCTION;

export const STATES = [
  {
    id: 1,
    name: "No Empezo",
    description: "El proyecto está en espera de aprobación.",
    state: "TODO",
    color: "bg-primary",
  },
  {
    id: 2,
    name: "En progreso",
    description: "El proyecto está en proceso de desarrollo.",
    state: "IN_PROGRESS",
    color: "bg-warning",
  },
  {
    id: 3,
    name: "Completado",
    description: "El proyecto ha sido completado.",
    state: "DONE",
    color: "bg-success",
  },
  {
    id: 4,
    name: "Cancelado",
    description: "El proyecto ha sido cancelado.",
    state: "CANCELED",
    color: "bg-danger",
  },
];
