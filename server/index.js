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

app.get("/getLoginInfo", (req, res) => {
  const sql = "SELECT username, status FROM login WHERE status LIKE  'Admin' "; // preko statusa se dodjeljuje na frontend
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json("Error");
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

        if (username === "1107" || username === "1111") {
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

app.post("/addUserAdmin", (req, res) => {
  const { staffid, ime, prezime, status, username, password } = req.body;
  const sql =
    "INSERT INTO login (staffid, ime, prezime, status, username, password) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [staffid, ime, prezime, status, username, password];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.log("Greska pri dodavanju osoba u bazu " + err);
      return res.status(500).json({ message: "Greška pri dodavanju osoblja" });
    } else {
      console.log("Osoblje uspješno dodano u bazu");
      res.status(200).json({ message: "Osoblje uspješno dodano" });
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
