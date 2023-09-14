// TODO - Blog Post CRUD
const prisma = require("../models/prisma");

async function store(req, res) {
    const {title, content, tag, category} = req.body;

    const post = await prisma.post.create({
        data: {
            title: title,
            content: content,
            tag: {
                connectOrCreate: {
                    where: {
                        id: 1
                    },
                    create: {
                        name: tag
                    }
                }
            },
            category: {
                connectOrCreate: {
                    where: {
                        id: 1
                    },
                    create: {
                        name: category
                    }
                }
            },
        }
    })

    return res.status(200).json(post)
}

async function view(req, res) {

    const {postId} = req.params

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: +postId
            }
        })

        return res.status(200).json(post)
    } catch (error) {
        return res.status(404).json({message: error.message})
    }
}

async function viewAll(req,res) {
    const posts = await prisma.post.findMany()
    return res.status(200).json(posts)
}

async function update(req, res) {}

async function destroy(req, res) {}

module.exports = { store, view, viewAll, update, destroy };
