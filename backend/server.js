const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // ✅ PostgreSQL client
require('dotenv').config();
// const mysql = require('mysql');
const app = express();
// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.url}`);
//   next();
// });

app.use(express.json());


app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


// const db = mysql.createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     password : "",
//     database: "crud"
// })

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM student');
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post('/create', async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO student (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ error: "Insert failed" });
  }
});

app.put('/update/:id', async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE student SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student updated", data: result.rows[0] });
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

app.get('/student/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM student WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(500).json({ error: "Fetch failed" });
  }
});



app.delete('/student/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM student WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted", deleted: result.rows[0] });
  } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});





app.listen(8081, () => {
    console.log('Server is running on port 8081');
});