import { FormEvent } from "react";

const SignupForm = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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
          onSubmit={handleSubmit}
        >
          <div className="flex gap-3">
            <p className="text-2xl font-medium">Signup </p>
            <img className="w-10" src="/plane_icon_white.png" />
          </div>
          <div className="flex flex-col gap-5 justify-start items-start">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              className="input bg-zinc-900"
              placeholder="Enter username"
            ></input>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="input bg-zinc-900"
              placeholder="Enter password"
            ></input>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              className="input bg-zinc-900"
              placeholder="Enter password again"
            ></input>
          </div>
          <button className="btn btn-primary normal-case"> Signup </button>
          <p>
            Already have an account?
            <span>
              <a href="/login" className="text-blue-500 hover:text-blue-600">
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
