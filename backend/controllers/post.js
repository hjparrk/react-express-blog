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

    const post = await prisma.post.findUnique({
        where: {
            id: 4
        }
    })


    return res.status(200).json(post)
}

async function viewAll(req,res) {
}

async function update(req, res) {}

async function destroy(req, res) {}

module.exports = { store, view, update, destroy };
