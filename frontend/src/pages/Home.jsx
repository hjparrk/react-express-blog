import { React, useEffect } from "react";
import axios from "axios";

const getSomething = async () => {
  const response = await axios.get("/api/");
  // const response = await axios.get("/");
  return response;
};

const Home = () => {
  useEffect(() => {
    getSomething();
  }, []);
  return (
    <div>
      <h1>Home</h1>
      <h1>Page</h1>
    </div>
  );
};

export default Home;
