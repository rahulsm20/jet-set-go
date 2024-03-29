import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../types";
import PostModal, { CommentType, PostProps } from "./PostModal";

type LikesType = {
  id: string;
  user: number;
  post: string;
};

const Post = ({ post }: PostProps) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [likes, setLikes] = useState<LikesType[]>([]);
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState("");
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);

  const getComments = async () => {
    try {
      const result = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/api/comments/" + post.id,
        {
          withCredentials: true,
        }
      );
      setComments(result.data);
    } catch (err) {
      console.error("Error getting comments " + err);
    }
  };

  const getLikes = async () => {
    try {
      const likeResults = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/api/likes/" + post.id,
        {
          withCredentials: true,
        }
      );
      setLikes(likeResults.data);

      const userLiked = likeResults.data.some(
        (like: LikesType) => like.user === user.user_id
      );
      const currentLikeId = likeResults.data.find(
        (like: LikesType) => like.user === user.user_id
      );
      setLikeId(currentLikeId.id);
      setLiked(userLiked);
    } catch (err) {
      console.error("Error getting likes " + err);
    }
  };

  const likeHandler = async () => {
    if (!liked) {
      try {
        const result = await axios.post(
          import.meta.env.VITE_SERVER_URL + "/api/likes",
          {
            post: post.id,
            user: user.user_id,
          },
          {
            withCredentials: true,
          }
        );
        setLiked(!liked);
        console.log(result);
      } catch (err) {
        console.error("Error liking post" + err);
      }
    } else {
      try {
        const result = await axios.delete(
          import.meta.env.VITE_SERVER_URL + "/api/likes/delete/" + likeId,
          {
            withCredentials: true,
          }
        );
        setLiked(!liked);
        console.log(result);
      } catch (err) {
        console.error("Error liking post" + err);
      }
    }
  };
  useEffect(() => {
    getComments();
    getLikes();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col bg-zinc-950  justify-start items-start  mt-10 rounded-2xl shadow-md shadow-slate-700 lg:w-3/4 ">
        <img src={post.image} className="rounded-t-xl" />
        {isAuthenticated ? (
          <button
            className="btn ml-5 mt-5 p-0 m-0 h-0 min-h-[20px] bg-transparent border-0"
            onClick={likeHandler}
          >
            {liked ? (
              <img className="w-5" src="/liked.png" />
            ) : (
              <img className="w-5" src="/like.svg" />
            )}
          </button>
        ) : (
          <Link to="/login">
            <button className="btn ml-5 mt-5 p-0 m-0 h-0 min-h-[20px] bg-transparent border-0">
              <img className="w-5" src="/like.svg" />
            </button>
          </Link>
        )}
        <div className="flex justify-center  items-start p-5 gap-3 flex-col">
          <p>
            {likes.length > 0 ? (
              <span>{post.likes} likes</span>
            ) : (
              <span>No likes yet</span>
            )}
          </p>
          <p className="flex gap-2">
            <span className="text-medium font-semibold">{post.username}</span>
            {post.caption}
          </p>
          <PostModal
            post={post}
            comments={comments}
            setComments={setComments}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
