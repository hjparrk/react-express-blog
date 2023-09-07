const util = require("util");
const crypto = require("crypto");
const prisma = require("../models/prisma");

const pbkdf2Promise = util.promisify(crypto.pbkdf2);

function createSalt() {
  try {
    const randomBytes = crypto.randomBytes(64).toString("hex");
    return randomBytes;
  } catch (error) {
    console.log(error);
    return;
  }
}

async function hashPassword(password) {
  const salt = createSalt();

  const key = await pbkdf2Promise(password, salt, 104906, 64, "sha512");
  const hashedPassword = key.toString("hex");

  return { hashedPassword, salt };
}

async function verifyPassword(password, salt, userPassword) {
  const key = await pbkdf2Promise(userPassword, salt, 104906, 64, "sha512");
  const hashedPassword = key.toString("hex");

  if (hashedPassword === password) {
    return true;
  } else {
    return false;
  }
}

async function login(req, res) {
  const inputEmail = req.body.email;
  const inputPassword = req.body.password;

  const user = await prisma.user.findUnique({
    where: {
      email: inputEmail,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "no such user" });
  } else {
    const password = user.password;
    const salt = user.salt;

    const isVerified = await verifyPassword(password, salt, inputPassword);

    if (isVerified) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ message: "Incorrect password" });
    }
  }
}

async function register(req, res) {
  const { name, email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return res.status(400).json({ message: "the email already exists" });
  } else {
    const { hashedPassword, salt } = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        salt: salt,
      },
    });
    return res.status(200).json(user);
  }
}

module.exports = { login, register };
