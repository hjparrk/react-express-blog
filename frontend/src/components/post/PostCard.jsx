import React from 'react';
import dateFormat from 'dateformat';
import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PostCard = (props) => {
  const { post } = props;

  const navigation = useNavigate();
  const handleRedirectToPost = () => {
    navigation('/posts/' + post.id);
  };

  return (
    <>
      <div
        className="w-full h-full bg-amber-50 bg-opacity-20 p-3 shadow-xl shadow-gray-300 gap-4  flex flex-col transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
        onClick={handleRedirectToPost}
      >
        <h1>{post.title}</h1>
        <div>
          <h1 className="text-xs">Joon Park</h1>
          <h1 className="text-xs">{dateFormat(post.createdAt, 'dS mmmm, yyyy')}</h1>
        </div>
      </div>
    </>
  );
};

export default PostCard;
