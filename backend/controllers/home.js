const prisma = require("../models/prisma");

/**
 * @param {*} req
 * @param {*} res
 * @returns {posts} posts
 */
async function view(req, res) {
  const posts = await prisma.post.findMany();
  const { username, email } = req.session;
  return res.status(200).json({ username, email });
}

module.exports = { view };
