import React, {useRef} from 'react';
import MarkdownIt from 'markdown-it'
import MarkdownEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"
import {createPostAPI} from "../../apis/postAPI";

const PostForm = () => {

    const markdownRef = useRef()

    const MarkdownParser = new MarkdownIt({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, str).value
                } catch (__) {
                }
            }
            return '' // use external default escaping
        }
    });

    async function createPost (content) {
        const response = await createPostAPI(content)
        return response
    }

    async function handleSubmit() {

        if(!markdownRef.current.state.text) {
            console.log("No content")
        }else {
            const markdownContent = markdownRef.current.getMdValue()
            console.log(markdownContent)
            const response = await createPost(markdownContent)
        }
    }

    return (
        <div className="flex flex-col w-[90%] h-[90%] gap-3">
            <div className="flex justify-end">
                <button className="text-sm text-black px-4 py-1 rounded-2xl border hover:shadow-black hover:bg-gray-200" onClick={handleSubmit}>Submit
                </button>
            </div>
            <MarkdownEditor className="h-full" ref={markdownRef} renderHTML={text => MarkdownParser.render(text)} />
        </div>
    );
};

export default PostForm;