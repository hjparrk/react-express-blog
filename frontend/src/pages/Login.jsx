import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUserAPI, fetchKeysAPI } from "../apis/userAPI";
import kakao_login_large_narrow from "../assets/images/kakao_login_medium_narrow.png";

const loginUser = async (email, password) => {
  const response = await loginUserAPI(email, password);
  const data = await response.data;
  return data;
};

const fetKeys = async () => {
  const response = await fetchKeysAPI();
  const data = await response.data;
  return data;
};

const Login = () => {
  const [CLIENT_ID, setCLIENT_ID] = useState();
  const [clientSecret, setclientSecret] = useState();
  const [REDIRECT_URI, setREDIRECT_URI] = useState();
  const [KAKAO_AUTH_URL, setKAKAO_AUTH_URL] = useState();

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigation = useNavigate();

  useEffect(() => {
    if (CLIENT_ID && clientSecret && REDIRECT_URI) {
      setKAKAO_AUTH_URL(
        `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
      );
    }
  }, [CLIENT_ID, clientSecret, REDIRECT_URI]);

  useEffect(() => {
    if (KAKAO_AUTH_URL) {
      window.location.href = KAKAO_AUTH_URL;
    }
  }, [KAKAO_AUTH_URL]);

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
      {/* <form className="flex flex-col w-40 gap-4">
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
      </form> */}
      <button
        onClick={async () => {
          const { clientID, clientSecret, redirectURI } = await fetKeys();
          setCLIENT_ID(clientID);
          setclientSecret(clientSecret);
          setREDIRECT_URI(redirectURI);
        }}
      >
        <img src={kakao_login_large_narrow} alt="Kakao Login" />
      </button>
    </div>
  );
};

export default Login;
