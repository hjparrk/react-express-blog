const prisma = require("../models/prisma");

/**
 * @param {*} req
 * @param {*} res
 * @returns {posts} posts
 */
async function view(req, res) {
  const posts = await prisma.post.findMany();
  return res.json({ data: "test" });
  // return res.json({ posts: posts });
}

module.exports = { view };
