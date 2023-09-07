import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginUserAPI } from "../apis/userAPI";

const loginUser = async (username, password) => {
  const response = await loginUserAPI(username, password);
  const data = await response.data;
  return data;
};

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const response = loginUser(username, password);
    console.log(response);

    navigation("/");
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
