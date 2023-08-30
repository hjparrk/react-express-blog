import React, { useRef } from "react";
import { loginUserAPI } from "../apis/userAPI";

const loginUser = async (username, password) => {
  const response = await loginUserAPI(username, password);
  const data = response.data;
  console.log(data);
};

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    loginUser(username, password);
  };

  return (
    <div>
      <form className="flex flex-col w-24">
        <input className="border-2 border-black" ref={usernameRef} />
        <input className="border-2 border-black" ref={passwordRef} />
        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
};

export default Login;
