import UsePosts from "../../hooks/posts/usePosts";
import AddPostComponent from "../../components/common/Publicacion/Publicacion";

const HomePage = () => {
  const { PostsToComponent } = UsePosts();
  const token = localStorage.getItem("token");

  return (
    <div className="bodyLandPage">
      <div className="body">
        {token && (
          <div className="w-100 d-flex justify-content-center">
            <AddPostComponent />
          </div>
        )}
        <div className="w-100 d-flex flex-column-reverse">
          <PostsToComponent />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
