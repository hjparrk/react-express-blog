import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserAPI } from "../apis/userAPI";

const registerUser = async (username, password, confirmPassword) => {
  const response = await registerUserAPI(username, password, confirmPassword);
  const data = await response.data;
  console.log(data);
};

const Register = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password === confirmPassword) {
      registerUser(username, password, confirmPassword);
      navigate("/login");
    }
  };

  return (
    <div>
      <form className="flex flex-col w-24">
        <label form="username">username</label>
        <input
          className="border-2 border-black"
          id="username"
          ref={usernameRef}
        />
        <label form="password">password</label>
        <input
          className="border-2 border-black"
          id="password"
          ref={passwordRef}
        />
        <label form="confirm-password">username</label>
        <input
          className="border-2 border-black"
          id="confirm-password"
          ref={confirmPasswordRef}
        />
        <button onClick={handleSubmit}>Register</button>
      </form>
    </div>
  );
};

export default Register;
