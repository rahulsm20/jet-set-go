import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Post from "../components/Post";

type PostDataType = {
  destination_id: string;
  city_name: string;
  image: string;
};

// type UserPostType = {
//   title: string;
//   caption: string;
//   image: string;
// };

const Home = () => {
  const [postData, setPostsData] = useState<PostDataType[]>(null || []);
  const [userPostData, setUserPostData] = useState([]);
  // const [comments, setComments] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/popular_destinations"
      );
      setPostsData(response.data);
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }
  };

  const getUserPosts = async () => {
    try {
      const result = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/api/posts"
      );
      setUserPostData(result.data);
    } catch (err) {
      console.error("Error fetching user posts " + err);
    }
  };

  useEffect(() => {
    getPosts();
    getUserPosts();
  }, []);

  // const posts = postData.map((post,key)=>{
  //   return(
  //     <POICard id={post.destination_id} title={post.city_name} image_url={post.image} key={key}/>
  //   )
  // })
  const posts = userPostData.map((post, key) => {
    return <Post post={post} key={key} />;
  });
  return posts ? (
    <div>
      <Navbar />
      <div className="mx-10 flex flex-col justify-center items-center">
        <p className="mt-10 mx-10 text-3xl">
          Popular destinations right now 🗺️
        </p>
        <div className="mt-5 mx-10 flex gap-2">
          {postData.map((post,key) => {
            return (
              <Link to={"/destinations/" + post.destination_id} key={key}>
                <p className="badge bg-red-600 text-white p-4 hover:bg-red-800">
                  {post.city_name}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="flex flex-col items-center justify-center md:w-2/5">
          <div className="grid md:grid-cols-1 gap-5 m-10">{posts}</div>
        </div>
      </div>
    </div>
  ) : (
    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif" />
  );
};

export default Home;
