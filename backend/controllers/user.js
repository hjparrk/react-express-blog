const login = (req, res) => {
  console.log(req.body);
  res.json({ data: "test data" });
};

const register = (req, res) => {
  console.log(req.body);
  res.json({ data: "test data" });
};

module.exports = { login, register };
