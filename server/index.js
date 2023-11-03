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
        const user = data[0]; // Assuming there's only one matching user

        const returnData = {
          message: "Login successful",
          username: user.username,
        };

        if (user.status === "Admin") {
          returnData.role = "admin";
        } else if (user.status === "CID") {
          returnData.role = "cid";
        } else if (user.status === "NCO") {
          returnData.role = "NCO";
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

// Dodavanje osoblja u bazu tabela "login"
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

// Dobavljanje osoblja tabela "login"
app.get("/getStaffData", (req, res) => {
  const sql = "SELECT id, ime, prezime, status FROM login";
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json("Error");
    }
    return res.status(200).json(data);
  });
});

//Brisanje osoblja tabela "login"
app.delete("/deleteStaff/:id", (req, res) => {
  const staffId = req.params.id;
  const sql = "DELETE FROM login WHERE id = ?";
  db.query(sql, [staffId], (err, result) => {
    if (err) {
      console.log("Greška pri brisanju osobe iz baze: " + err);
      return res.status(500).json({ message: "Greška pri brisanju osobe" });
    } else {
      console.log("Osoba uspješno obrisana iz baze");
      return res.status(200).json({ message: "Osoba uspješno obrisana" });
    }
  });
});

// Ruta za ažuriranje osoblja tabela "login"
app.put("/updateStaff/:id", (req, res) => {
  const staffId = parseInt(req.params.id);
  const updatedData = req.body;

  const sql = "UPDATE login SET ime = ?, prezime = ?, status = ? WHERE id = ?";
  const values = [
    updatedData.ime,
    updatedData.prezime,
    updatedData.status,
    staffId,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log("Greška pri ažuriranju osobe u bazi: " + err);
      return res.status(500).json({ message: "Greška pri ažuriranju osobe" });
    } else {
      console.log("Osoba uspješno ažurirana u bazi");
      return res.status(200).json({ message: "Osoba uspješno ažurirana" });
    }
  });
});

//Dohvaćanje podataka iz tabele "case_table"
app.get("/getCases", (req, res) => {
  const query = "SELECT * FROM case_table";
  db.query(query, (err, rezultat) => {
    if (err) {
      console.error("Greška pri dohvaćanju podataka: " + err.message);
      res.status(500).json({ error: "Greška pri dohvaćanju podataka" });
    } else {
      res.status(200).json(rezultat);
    }
  });
});

app.get("/getCaseDetail", (req, res) => {
  const query = "SELECT * FROM complainant";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Greška pri dohvaćanju podataka: " + err.message);
      res.status(500).json({ error: "Greška pri dohvaćanju podataka" });
    } else {
      res.status(200).json(result);
    }
  });
});

app.post("/postCases", (req, res) => {
  const {
    case_id,
    comp_name,
    tel,
    occupation,
    age,
    gender,
    addrs,
    region,
    district,
    loc,
  } = req.body;
  const sql =
    "INSERT INTO complainant (case_id, comp_name, tel, occupation, age, gender, addrs, region, district, loc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    case_id,
    comp_name,
    tel,
    occupation,
    age,
    gender,
    addrs,
    region,
    district,
    loc,
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.log("Greska pri dodavanju djela u bazu " + err);
      return res.status(500).json({ message: "Greška pri dodavanju djela" });
    } else {
      console.log("Case uspješno dodano u bazu");
      res.status(200).json({ message: "Dodano" });
    }
  });
});

app.post("/postCaseDetail", (req, res) => {
  const { case_id, case_type, diaryofaction } = req.body;
  const sql =
    "INSERT INTO case_table (case_id, case_type, diaryofaction) VALUES (?, ?, ?)";
  const values = [case_id, case_type, diaryofaction];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.log("Greska pri dodavanju djela u bazu " + err);
      return res.status(500).json({ message: "Greška pri dodavanju djela" });
    } else {
      console.log("Case uspješno dodano u bazu");
      res.status(200).json({ message: "Dodano" });
    }
  });
});

app.get("/getOpis", (req, res) => {
  const query = "SELECT * FROM case_table";
  db.query(query, (err, result) => {
    if (err) {
      console.log("Greska pri dohvacanju opisa " + err);
      return res.status(500).json({ message: "Greška pri dohvaćanju opisa" });
    } else {
      console.log("Opis uspjesno dohvacen");
      res.status(200).json(result);
    }
  });
});

//Dohvaćanje krivicnih djela iz tabele "crime_type"
app.get("/getCrimeType", (req, res) => {
  const query = "SELECT des FROM crime_type";
  db.query(query, (err, results) => {
    if (err) {
      console.log("Greska dohvacanje podataka iz crime_type: " + err.message);
      res.status(500).json({ error: "Greska i think" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
