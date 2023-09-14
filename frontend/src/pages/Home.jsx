import { React, useEffect, useState } from 'react';
import { viewAllPostsAPI } from '../apis/postAPI';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Background from '../layouts/background';
import PostCard from '../components/post/PostCard';

const Home = () => {
  const [posts, setPosts] = useState();
  async function viewPost(content) {
    const response = await viewAllPostsAPI();
    const posts = await response.data;
    setPosts(posts);
  }

  useEffect(() => {
    viewPost();
  }, []);

  return (
    <>
      <Background>
        <div className="flex flex-col w-full h-full pt-[15%] gap-6 items-center justify-start">
          <div className="grid grid-cols-4 gap-8">
            {posts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </Background>
    </>
  );
};

export default Home;
