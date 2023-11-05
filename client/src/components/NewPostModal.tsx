import axios from "axios";
import { useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../types";
import { useNavigate } from "react-router-dom";

const NewPostModal = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };
  const createPost = async (data: FieldValues) => {
    data["user"] = user.user_id;
    data.image = data.image[0];
    try {
      await axios.post(
        import.meta.env.VITE_SERVER_URL + `/api/posts`,
        data,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
        closeModal();
        navigate('/')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button
        className="btn btn-transparent hover:bg-white bg-slate-200 normal-case text-black btn-sm text-sm"
        onClick={openModal}
      >
        Create new post
      </button>
      <dialog ref={modalRef} className="modal p-10 backdrop-blur-sm">
        <div className="bg-zinc-950 w-1/2 border border-zinc-800 p-5">
          <form method="dialog">
            <button className="btn btn-sm btn-circle bg-slate-200 hover:bg-white text-black absolute right-1/3 flex-end m-3">
              X
            </button>
          </form>
          <div>
            <form
              onSubmit={handleSubmit((data) => createPost(data))}
              className="flex flex-col justify-center items-center gap-5"
            >
              <label htmlFor="image" className="btn normal-case btn-transparent bg-blue-500 text-white hover:bg-blue-400">Upload an image</label>
              <input
                {...register("image")}
                type="file"
                id="image"
                accept="image/*"
                name="image"
                className="hidden"
              />
              <input
                {...register("caption")}
                type="text"
                id="caption"
                name="caption"
                className="input"
                placeholder="Enter caption"
                required
              />

              <button type="submit" className="btn btn-primary normal-case">
                Submit
              </button>
              <hr />
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default NewPostModal;
