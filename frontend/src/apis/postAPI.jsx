import axios from 'axios'

const createPostAPI = async (content) => {
    const title = "React-Express blog"
    const tag = "Express"
    const category = "Web Development"

    const response = await axios.post('/api/posts', {title: title, content: content, tag: tag, category: category})

    console.log(response)

    return response
}

export {createPostAPI}