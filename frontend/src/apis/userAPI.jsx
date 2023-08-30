import axios from "axios";

const loginUserAPI = async (username, password) => {
  console.log(username);
  console.log(password);
  const response = await axios.post("/api/login", {
    username: username,
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

export { loginUserAPI, registerUserAPI };
