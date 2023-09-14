import './App.css';
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom';

// pages

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts/:postId" element={<Post />} />
        <Route path="*" exact element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
