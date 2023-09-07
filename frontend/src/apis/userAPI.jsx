import axios from "axios";

const getUserAPI = async () => {
  const response = await axios.get("/api/");
  return response;
};

const loginUserAPI = async (email, password) => {
  const response = await axios.post("/api/login", {
    email: email,
    password: password,
  });

  return response;
};

const registerUserAPI = async (username, password, confirmPassword) => {
  const response = await axios.post("/api/register", {
    username: username,
    password: password,
    confirmPassword: confirmPassword,
  });

  return response;
};

const kakaoAuthAPI = async () => {
  const response = await axios.get("/api/kakao-auth/");
  const data = await response.data;

  return data;
};

export { getUserAPI, loginUserAPI, registerUserAPI, kakaoAuthAPI };
