// server.js
const express = require("express");
const mariadb = require("mariadb");
const app = express();
const port = 3000;

app.use(express.json());

const db = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "travel",
  connectionLimit: 5,
});

// Endpoint GET /getAccounts
app.get("/getAccounts", async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();
    const rows = await conn.query("SELECT * FROM accounts");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
});

// Endpoint GET /getItems
app.get("/getItems", async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();
    const rows = await conn.query("SELECT * FROM items");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
});

// Endpoint PUT /updateIsSelected/:id
app.put("/updateIsSelected/:id", async (req, res) => {
  const itemId = req.params.id;
  let conn;
  try {
    conn = await db.getConnection();
    const result = await conn.query(
      `UPDATE items
      SET isSelected = CASE
        WHEN isSelected = false THEN true
        WHEN isSelected = true THEN false
        ELSE isSelected
      END
      WHERE id = ?`,
      [itemId]
    );
    res.json({
      message: `Successfully updated 'isSelected' for item with id ${itemId}.`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
