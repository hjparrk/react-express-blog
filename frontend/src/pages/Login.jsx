import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginUserAPI, kakaoAuthAPI } from "../apis/authAPI";
import kakao_login_large_narrow from "../assets/images/kakao/kakao_login_medium_narrow.png";

const loginUser = async (email, password) => {
  const response = await loginUserAPI(email, password);
  const data = await response.data;
  return data;
};

const kakaoAuthUrl = async () => {
  const response = await kakaoAuthAPI();
  return response;
};

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await loginUser(email, password);
      console.log(response);
      navigation("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col gap-4">
      <form className="flex flex-col w-40 gap-4">
        <div>
          <label htmlFor="username">username</label>
          <input
            className="border-2 border-black"
            id="username"
            ref={emailRef}
          />
        </div>
        <div>
          <label htmlFor="password">username</label>
          <input
            className="border-2 border-black"
            name="password"
            ref={passwordRef}
          />
        </div>
        <button onClick={handleSubmit}>Login</button>
      </form>
      <button
        onClick={async () => {
          const url = await kakaoAuthUrl();
          console.log(url);
          window.location.href = url;
        }}
      >
        <img src={kakao_login_large_narrow} alt="Kakao Login" />
      </button>
    </div>
  );
};

export default Login;
