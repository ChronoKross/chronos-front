import { useState } from "react";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleUser(e) {
    setUserName(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(userName, password);
  }

  return (
    <div className=" flex justify-center align-middle">
      <div className="w-full max-w-xs h-fit ">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              onChange={(e) => handleUser(e)}
              type="text"
              placeholder="Username"
              autoComplete="username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              onChange={(e) => handlePassword(e)}
              placeholder="******************"
              autoComplete="current-password"
            />
            <p className="text-red-500 text-xs italic">
              {password ? "" : "Please choose a password."}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={(e) => handleSubmit(e)}
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
