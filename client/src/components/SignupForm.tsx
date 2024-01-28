import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signup } from "../api";

type FormInputs = {
  username: string;
  password: string;
  confirm_password: string;
  email: string;
};

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const [userExists, setUserExists] = useState(false);

  const signupHandler = async (data: FieldValues) => {
    try {
      await signup(data);
      navigate("/login");
    } catch (err) {
      console.error("Error signup up user:", err);
      setUserExists(true);
    }
    setLoading(false);
  };
  return (
    <div className="grid md:flex gap-2 grid-cols-1 md:grid-cols-2 justify-center items-center">
      <div className="flex flex-col justify-start p-5 md:w-1/2 w-full text-sm">
        <h1 className="flex gap-4 items-center">Welcome to Jet Set Go!</h1>
        <p className="text-2xl my-5">The all-in-one travel app</p>
        <div className="flex flex-col gap-5">
          <p>
            Embark on unforgettable journeys, plan your dream vacations, and
            explore the globe like never before with Jet Set Go.
          </p>
          <p>
            This all-in-one travel app offers a world of adventure at your
            fingertips. Find and book the perfect accommodations, discover
            hidden gems, create custom itineraries, and connect with fellow
            travelers.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center mt-10 gap-5">
        <form
          className="flex flex-col gap-5 bg-zinc-950 p-10 m-10 rounded-xl border-2 border-zinc-900 text-center w-96"
          onSubmit={handleSubmit((data) => signupHandler(data))}
        >
          <div className="flex gap-3">
            <p className="text-2xl font-medium">Signup </p>
            <img className="w-10" src="/plane_icon_white.png" />
          </div>
          <div className="flex flex-col gap-5 justify-start items-start">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              className="input input-sm bg-zinc-900"
              placeholder="Enter username"
              required={true}
              {...register("username", { minLength: 5, required: true })}
            ></input>
            {errors.username && (
              <span className="text-red-500 font-light">
                Username should be atleast 5 characters long
              </span>
            )}
            {userExists ? (
              <span className="text-red-500">
                User with that username already exists
              </span>
            ) : (
              <></>
            )}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="input input-sm bg-zinc-900"
              placeholder="Enter email"
              required={true}
              {...register("email", {
                minLength: 5,
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            ></input>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="input input-sm bg-zinc-900"
              placeholder="Enter password"
              required={true}
              {...register("password", { minLength: 5 })}
            ></input>
            {errors.password && (
              <span className="text-red-500 font-light">
                Password should be atleast 5 characters long
              </span>
            )}
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              className="input input-sm bg-zinc-900"
              placeholder="Enter password again"
              required={true}
              {...register("confirm_password", {
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
            ></input>
            {errors.confirm_password && (
              <span className="text-red-500 font-light">
                Passwords do not match
              </span>
            )}
          </div>
          {!loading ? (
            <button className="btn btn-primary normal-case"> Signup </button>
          ) : (
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
          )}
          <p>
            Already have an account?
            <span>
              <a
                href="/login"
                className="text-blue-500 hover:text-blue-600 ml-1"
              >
                Login here
              </a>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
