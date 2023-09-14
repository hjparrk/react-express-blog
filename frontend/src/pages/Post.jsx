import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { viewPostAPI } from '../apis/postAPI';
import Background from '../layouts/background';
import dateFormat from 'dateformat';
import Markdown from '../components/post/Markdown';

const Post = () => {
  const [post, setPost] = useState();
  const { postId } = useParams();
  const navigation = useNavigate();
  async function viewPost(postId) {
    const response = await viewPostAPI(postId);
    const post = await response.data;
    if (!post) {
      navigation('/404');
    }
    setPost(post);
  }

  useEffect(() => {
    viewPost(postId);
  }, []);

  function handleRedirectHome() {
    navigation('/');
  }

  return (
    <Background>
      <div className="flex w-full justify-center">
        <div className="flex flex-col w-[50%] items-start">
          {post && (
            <div className="prose">
              <div className="py-16">
                <h1>{post?.title}</h1>
                <div className="flex flex-row gap-5">
                  <h5 className="font-semibold">Joon Park</h5>
                  <h5>{dateFormat(post?.createdAt, 'dddd, dS mmmm, yyyy')}</h5>
                </div>
              </div>
              <div className="prose-pre:text-xs prose-pre:w-full prose-pre:bg-transparent">
                {post && <Markdown post={post} />}
              </div>
              <div className="flex flex-row gap-5 pt-16 text-sm">
                <h5>Last updated</h5>
                <h5>{dateFormat(post?.createdAt, 'dddd, dS mmmm, yyyy')}</h5>
              </div>
            </div>
          )}
        </div>
      </div>
    </Background>
  );
};

export default Post;
