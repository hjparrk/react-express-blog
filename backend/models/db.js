const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "gywns0827",
  database: "react-express-app",
});

client.connect();

client.query(`SELECT * FROM post`, (err, res) => {
  if (!err) {
    console.log(res.rows);
  } else {
    console.log(err);
  }
  client.end();
});
