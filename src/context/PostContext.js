import { createContext, useContext, useState } from "react";

// Crear el contexto
const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const updatePosts = (newPosts) => {
    setPosts(newPosts);
  };

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const updateUser = (user) => {
    setCurrentUser(user);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        currentUser,
        updatePosts,
        addPost,
        updateUser,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
