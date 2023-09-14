import "./App.css";
import { useRoutes } from "react-router-dom";

// pages

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";

function App() {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {path: "/create-post", element: <CreatePost />}
  ]);

  return routes;
}

export default App;
