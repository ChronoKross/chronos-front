import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  // const useContext = useContext(UserContext);

  function handleUser(e) {
    setUserName(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when submitting

    try {
      const response = await axios.post(
        "https://repreveback-end.onrender.com//auth/login",
        {
          userName: userName,
          password: password,
        }
      );

      if (response.status === 200) {
        // Save the username in localStorage
        localStorage.setItem("admin", userName);

        // Redirect to the home page ("/") after successful login
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading to false after login attempt
    }
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
            <p className="text-red-500 text-xs italic">
              {userName ? "" : "Please create a username."}
            </p>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              onChange={(e) => handlePassword(e)}
              placeholder="******************"
              autoComplete="current-password"
            />
            <p className="text-red-500 text-xs italic">
              {password ? "" : "Please create a password."}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none ${
                isLoading ? "opacity-50 cursor-wait" : "" // Disable button and show loading cursor while loading
              }`}
              type="submit"
              onClick={(e) => handleSubmit(e)}
              disabled={isLoading} // Disable the button while loading
            >
              {isLoading ? "Logging In..." : "Login"}
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
