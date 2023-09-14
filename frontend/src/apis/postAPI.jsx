import axios from 'axios';

const storePostAPI = async (data) => {
  const tag = 'Express';
  const { title, category, content } = data;

  const response = await axios.post('/api/posts', {
    title: title,
    content: content,
    tag: tag,
    category: category,
  });

  console.log(response);

  return response;
};

const viewPostAPI = async (postId) => {
  const response = await axios.get('/api/posts/' + postId);
  return response;
};

const viewAllPostsAPI = async (postId) => {
  const response = await axios.get('/api/posts/');
  return response;
};

export { storePostAPI, viewPostAPI, viewAllPostsAPI };
