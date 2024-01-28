import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { setAuthenticated } from "../store/authSlice";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const onSubmit = async (data: FieldValues) => {
    try {
      setLoading(true);
      const result = await login(data);
      if (result.data.message == "Login successful") {
        dispatch(setAuthenticated(true));
        navigate("/");
      } else {
        setError("Please enter valid credentials");
      }
    } catch (err) {
      console.log(`${err}`);
      setError("Please enter valid credentials");
    }
    setLoading(false);
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
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
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
      {error ? <span className="text-red-500">{error}</span> : <></>}
    </div>
  );
};

export default LoginForm;
