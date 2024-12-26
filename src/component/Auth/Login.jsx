import React, { useState } from "react";

const Login = ({ handleLogin, handleSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [name, setName] = useState("");
  const [signUp, setSignUp] = useState(false);

  const logInHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  const signUpnHandler = (e) => {
    e.preventDefault();
    if ((name, email && password && role)) {
      handleSignUp(name, email, password, role);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="font-custom left-0 uppercase antialiased font-light tracking-wider m-4 mb-8">
        <h1 className="text-3xl md:text-5xl text-stone-500 pb-2">WorkQueue</h1>
        <h2 className="text-xs text-stone-400 flex flex-col md:flex-row md:flex-wrap md:space-x-1">
          <span>Organizing and prioritizing</span>
          <span>employee tasks.</span>
        </h2>
      </div>
      <div className="text-white">
        {!signUp && (
          <div className="flex flex-col md:flex-row">
            <div className="border-2 w-[300px] border-emerald-600 p-12 py-8 md:py-20 m-2 md:m-8 rounded-lg">
              <form
                onSubmit={(e) => {
                  logInHandler(e);
                }}
                className="flex flex-col items-center justify-center "
              >
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  className="bg-transparent outline-none border-2 border-emerald-600 text-l mb-2 p-2 rounded-xl"
                  type="email"
                  placeholder="Enter Your Email"
                />

                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                  className="bg-transparent outline-none border-2 border-emerald-600 text-l p-2 rounded-xl"
                  type="password"
                  placeholder="Enter Your Password"
                />
                <button className="outline-none border-none bg-emerald-600 text-xl m-2 p-2 w-full rounded-xl">
                  Login
                </button>
                <button
                  onClick={() => setSignUp(true)}
                  className="outline-none border-none bg-red-600 text-xl m-2 p-2 w-full rounded-xl"
                >
                  Sign Up
                </button>
              </form>
            </div>
            <div className="border-2 w-[300px] border-emerald-600 px-8 md:py-20 m-2 md:m-8 rounded-lg">
              <div className="my-6">
                <h1 className="pb-1">Employee Login</h1>
                <button
                  onClick={() => handleLogin("e@e.com", "123")}
                  className="outline-none border-none bg-emerald-600 text-xl p-2 w-full rounded-xl"
                >
                  Emp Login
                </button>
              </div>
              <div className="my-6">
                <h1 className="pb-1">Admin Login</h1>
                <button
                  onClick={() => handleLogin("m@m.com", "123")}
                  className="outline-none border-none bg-emerald-600 text-xl p-2 w-full rounded-xl"
                >
                  Admin Login
                </button>
              </div>
            </div>
          </div>
        )}
        {signUp && (
          <div className="border-2 border-emerald-600 p-20 rounded-lg">
            <form
              onSubmit={(e) => {
                signUpnHandler(e);
              }}
              className="flex flex-col items-center justify-center "
            >
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="bg-transparent outline-none border-2 border-emerald-600 text-l mb-2 p-2 rounded-xl"
                type="text"
                placeholder="Enter Your Name"
              />

              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                className="bg-transparent outline-none border-2 border-emerald-600 text-l mb-2 p-2 rounded-xl"
                type="email"
                placeholder="Enter Your Email"
              />

              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                className="bg-transparent outline-none border-2 border-emerald-600 text-l p-2 rounded-xl"
                type="password"
                placeholder="Enter Your Password"
              />

              <select
                className="bg-transparent outline-none border-2 border-emerald-600 text-l w-full mt-2 p-2 rounded-xl"
                onChange={(e) => setRole(e.target.value)}
                id="cars"
              >
                <option className="text-black" value="admin">
                  admin
                </option>
                <option className="text-black" value="emp">
                  employee
                </option>
              </select>

              <button className="outline-none border-none bg-emerald-600 text-xl m-2 p-2 w-full rounded-xl">
                Sign Up
              </button>
              <button
                onClick={() => setSignUp(false)}
                className="outline-none border-none bg-red-600 text-xl m-2 p-2 w-full rounded-xl"
              >
                Log In
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
