import axios from 'axios'

const storePostAPI = async (content) => {
    const title = "React-Express blog"
    const tag = "Express"
    const category = "Web Development"

    const response = await axios.post('/api/posts', {title: title, content: content, tag: tag, category: category})

    console.log(response)

    return response
}

const viewPostAPI = async () => {

    const response = await axios.get('/api/posts/1')
    return response
}

export {storePostAPI, viewPostAPI}