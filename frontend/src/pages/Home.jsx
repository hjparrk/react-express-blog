import { React, useEffect, useState } from "react";
import { getUserAPI } from "../apis/userAPI";

const getUser = async () => {
  const response = await getUserAPI();
  const data = await response.data;
  return data;
};

const Home = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    getUser()
      .then((res) => {
        return res;
      })
      .then((user) => {
        setUsername(user.username);
        setEmail(user.email);
      });
  }, []);

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center gap-10">
      <div className="flex flex-row gap-2">
        <h1>Home</h1>
        <h1>Page</h1>
      </div>
      {username && email && (
        <div className="text-center">
          <h1>{username}</h1>
          <h1>{email}</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
