import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { storePostAPI } from '../../apis/postAPI';
import Background from '../../layouts/background';

const PostForm = () => {
  const markdownRef = useRef();
  const titleRef = useRef();
  const [category, setCategory] = useState('react');
  const navigation = useNavigate();

  const MarkdownParser = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (__) {}
      }
      return ''; // use external default escaping
    },
  });

  async function createPost(content) {
    const response = await storePostAPI(content);
    return response;
  }

  async function handleSubmit() {
    if (!markdownRef.current.state.text || !titleRef.current.value) {
      console.log('No content');
    } else {
      const title = titleRef.current.value;
      const markdownContent = markdownRef.current.getMdValue();
      const data = { title, category, content: markdownContent };
      const response = await createPost(data);
      navigation('/');
    }
  }

  function handleCategory(e) {
    e.preventDefault();
    setCategory(e.target.value);
  }

  return (
    <div className="flex flex-col w-[90%] h-[90%] gap-2">
      <div className="flex justify-end">
        <button
          className="text-sm text-black px-4 py-1 rounded-2xl border border-black hover:shadow-black hover:bg-gray-200"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <input
        className="w-[50%] h-8 border border-black rounded-2xl py-2 px-4"
        placeholder="Enter Title"
        maxLength={30}
        ref={titleRef}
      />
      <label className="text-xs">Category</label>
      <select
        className="text-xs w-[20%] h-8 border border-black rounded-2xl p-2"
        required={true}
        onChange={handleCategory}
      >
        <option value="react">React</option>
        <option value="node">Node</option>
      </select>
      <p>{category}</p>
      <MarkdownEditor
        className="h-full"
        ref={markdownRef}
        renderHTML={(text) => MarkdownParser.render(text)}
      />
    </div>
  );
};

export default PostForm;
