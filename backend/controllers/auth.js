const util = require("util");
const crypto = require("crypto");
const axios = require("axios");
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
    return res.status(404).json({ message: "no such user" });
  } else {
    const password = user.password;
    const salt = user.salt;

    const isVerified = await verifyPassword(password, salt, inputPassword);

    if (isVerified) {
      return res.status(200).json({ username: user.name, email: user.email });
    } else {
      return res.status(404).json({ message: "Incorrect password" });
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

function kakaoAuth(req, res) {
  const kakao = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectURI: process.env.REDIRECT_URI,
  };

  // const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
  return res.json(kakao);
}

async function kakaoAuthCallback(req, res) {
  const code = req.query.code;
  try {
    const response = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI,
        code: code,
      },
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data = await response.data;
    const { token_type, access_token, refresh_token } = data;

    if (access_token) {
      const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${access_token}`,
        },
      });

      const user = await response.data.kakao_account;
      const username = user.profile.nickname;
      const email = user.email;
      req.session.username = username;
      req.session.email = email;
      return res.status(200).json({ message: "success" });
    } else {
      return res.status(404).json({ message: "Access Error" });
    }
  } catch (error) {
    console.log(error);
    return;
  }
}

module.exports = { login, register, kakaoAuth, kakaoAuthCallback };
