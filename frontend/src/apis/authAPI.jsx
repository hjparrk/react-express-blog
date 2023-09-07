import axios from "axios";

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
  const response = await axios.get("/api/kakao-auth/login");
  const data = await response.data;
  return data;
};

export { loginUserAPI, registerUserAPI, kakaoAuthAPI };
