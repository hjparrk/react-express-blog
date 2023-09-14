import {React, useEffect, useState} from "react";
import {viewPostAPI} from "../apis/postAPI";
import ReactMarkdown from 'react-markdown'

const Home = () => {

    const [data, setData] = useState()

    async function viewPost(content) {
        const response = await viewPostAPI()
        const data = await response.data
        setData(data)
    }

    useEffect(() => {
        viewPost()
    }, [])

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center gap-10">
            <div className="flex flex-row gap-2">
                {data && <div className='prose'><ReactMarkdown >{data.content}</ReactMarkdown></div>}
            </div>
        </div>
    );
}

export default Home;
