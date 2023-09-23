import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { setAuthenticated } from "../store/authSlice";
import { useState } from "react";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    const result = await login(data);
    if (result.data.message == "Login successful") {
      dispatch(setAuthenticated(true));
    }
    navigate("/");
    console.log(result.data.message);
  };
  return (
    <div className="flex flex-col justify-start items-center mt-10 gap-5">
      <form
        className="flex flex-col gap-5 bg-zinc-950 p-10 rounded-xl border-2 border-zinc-900 text-center w-96"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <div className="flex gap-3">
          <p className="text-2xl font-medium">Login </p>
          <img className="w-10" src="/plane_icon_white.png" />
        </div>
        <div className="flex flex-col gap-5 justify-start items-start">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="input bg-zinc-900 border-2 border-zinc-700"
            placeholder="Enter username"
            id="username"
            required={true}
            {...register("username")}
          ></input>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="input bg-zinc-900 border-2 border-zinc-700"
            placeholder="Enter password"
            id="password"
            required={true}
            {...register("password")}
          ></input>
        </div>
        {loading ? (
          <button className="btn btn-primary normal-case" type="submit">
            <img src="/loading.svg"  className="w-5"/>
            Processing
          </button>
        ) : (
          <button className="btn btn-primary normal-case" type="submit">
            Login
          </button>
        )}
        <p className="flex gap-1">
          Don't have an account?
          <a href="/signup" className="text-blue-500 hover:text-blue-600">
            Signup here!
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
