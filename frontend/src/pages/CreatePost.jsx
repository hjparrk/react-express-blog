import React from 'react';
import PostForm from '../components/post/PostForm';

const CreatePost = () => {
  return (
    <>
      <div className="flex flex-col w-screen h-screen">
        <h1 className="flex justify-center text-3xl font-bold">Create Post</h1>
        <div className="flex w-screen h-[90%] flex-col items-center">
          <PostForm />
        </div>
      </div>
    </>
  );
};

export default CreatePost;
