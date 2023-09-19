import axios from "axios";
import React, { FormEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../types";

export type CommentType = {
  id:string;
  username: string;
  content: string;
};

export interface PostProps{
  post: {
    id: string;
    image: string;
    user: string;
    username: string;
    caption: string;
    likes:number;
  };
}

export interface PostModalProps {
  post: {
    id: string;
    image: string;
    user: string;
    username: string;
    caption: string;
    likes:number;
  };
  comments: CommentType[];
  setComments:React.Dispatch<CommentType[]>
}

const PostModal: React.FC<PostModalProps> = ({ post, comments,setComments }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state:RootState)=>state.auth.user)
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [content, setContent] = useState("");

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const postComment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const comment = 
      await axios.post(
        import.meta.env.VITE_SERVER_URL + "/api/comments",
        {
          post: post.id,
          user: user.user_id,
          content: content,
        }
      );
      setComments([...comments,comment.data])
    } catch (err) {
      console.error("Failed to add comment " + err);
    }
  };

  const deleteComment = async(id:string)=>{
    try{
      const result = await axios.delete(import.meta.env.VITE_SERVER_URL+"/api/comments/delete/"+id)
      if(result.data.length==0){
        const updatedComments = comments.filter((comment) => comment.id !== id);
        setComments(updatedComments);
        }
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <button
        className="btn btn-transparent hover:bg-white bg-slate-200 normal-case text-black btn-sm text-sm"
        onClick={openModal}
      >
        View 
        {comments.length>1 ? 
          <span>
            all {comments.length} comments
          </span>
          :
        <span>
          comment 
        </span>
          }
      </button>
      <dialog ref={modalRef} className="modal p-10 backdrop-blur-sm">
        <div className="bg-zinc-950 w-3/4 border border-zinc-800">
          <form method="dialog">
            <button className="btn btn-sm btn-circle bg-slate-200 hover:bg-white text-black absolute right-56 flex-end m-3">
              ✕
            </button>
          </form>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <img src={post.image} />
            <div className=" flex flex-col md:justify-between p-4">
              <div>
                <div className="mb-5">
                  <p className="text-xl font-semibold">{post.username}</p>
                  <p>{post.caption}</p>
                </div>
                <hr />
                <div className="mt-5">
                  {comments.map((comment,key) => {
                    return (
                      <div key={key} className="flex items-center gap-4">
                        <p className="flex gap-2">
                          <span className="font-medium">
                          {comment.username}
                          </span>
                          <span>{comment.content}</span>
                        </p>
                        {
                         comment.username==user.username ? 
                         <div className="flex items-center">
                          <button className="btn btn-sm btn-circle bg-transparent border-0 normal-case" onClick={()=>deleteComment(comment.id)}>
                            <img src="/trash.svg" className="w-4"/>
                          </button>
                         </div>
                          :
                          <></>
                        }
                      </div>
                    );
                  })}
                </div>
              </div>
              {
                isAuthenticated ? 
                <form className="flex" onSubmit={postComment}>
                <input
                  className="input bg-transparent border border-zinc-800"
                  placeholder="Add a comment"
                  id="content"
                  name="content"
                  onChange={(event) => setContent(event.target.value)}
                />
                <button
                  className="btn bg-transparent hover:bg-transparent border-0  hover:text-white normal-case"
                  type="submit"
                >
                  Post
                </button>
              </form>
              :
              <p className="text-gray-400">Login to comment</p>
                }
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PostModal;
