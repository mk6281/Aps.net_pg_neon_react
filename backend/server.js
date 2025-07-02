const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.url}`);
//   next();
// });

app.use(express.json());


app.use(cors());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password : "",
    database: "crud"
})

app.get('/', (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            res.json(result);
        }
    })
})

app.post('/create', (req, res) => {
    const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?, ?)";
    const values = [req.body.name, req.body.email];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json({ message: "Student added", data });
    });
});

app.put('/update/:id', (req, res) => {
    const sql = " Update student SET `Name` = ?, `Email` = ? WHERE ID = ?";
    const values = [req.body.name, req.body.email];
    const id = req.params.id

    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json({ message: "Student added", data });
    });
});

app.get('/student/:id', (req, res) => {
  const sql = "SELECT * FROM student WHERE ID = ?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json(data[0]);
  });
});



app.delete('/student/:id', (req, res) => {
    const sql = " DELETE FROM student WHERE ID = ?";
    const id = req.params.id

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json({ message: "Student added", data });
    });
});




app.listen(8081, () => {
    console.log('Server is running on port 8081');
});