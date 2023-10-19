//express app using corse and a mock get api
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "policijasistem",
});

app.get("/getLoginInfo/:username", (req, res) => {
  const username = req.params.username;
  const sql = "SELECT status, username FROM login WHERE username = ?";
  db.query(sql, [username], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error" });
    }
    return res.status(200).json(data);
  });
});

app.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;
    const sql = "SELECT * FROM login WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, data) => {
      if (err) {
        return res.status(500).json("Error");
      }
      if (data.length > 0) {
        returnData = {
          message: "Login successful",
          username: username,
        };

        if (username === "1107") {
          returnData.role = "admin";
        } else {
          returnData.role = "user";
        }
        return res.status(200).json(returnData);
      } else {
        return res.status(401).json({
          message: "An error occurred",
        });
      }
    });
  } catch (err) {
    console.log(err + " greska");
  }
});

app.get("/api", (req, res) => {
  res.send("Hello World !");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
