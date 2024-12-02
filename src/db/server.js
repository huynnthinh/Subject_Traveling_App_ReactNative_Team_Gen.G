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

// Endpoint POST /register
app.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  let conn;
  try {
    conn = await db.getConnection();
    const result = await conn.query(
      `INSERT INTO accounts (name, email, phone, password) VALUES (?, ?, ?, ?)`,
      [name, email, phone, password]
    );
    res.json({
      message: `Successfully registered user with email ${email}.`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
});

// Endpoint PUT /updatePassword/:id
app.put("/updatePassword/:id", async (req, res) => {
  const accountId = req.params.id;
  const { password } = req.body;
  let conn;
  try {
    conn = await db.getConnection();
    const result = await conn.query(
      `UPDATE accounts
      SET password = ?
      WHERE id = ?`,
      [password, accountId]
    );
    res.json({
      message: `Successfully updated password for account with id ${accountId}.`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
});

// Endpoint PUT /updateInf/:id
app.put("/updateInf/:id", async (req, res) => {
  const accountId = req.params.id;
  const { name, diachi } = req.body;
  let conn;
  try {
    conn = await db.getConnection();
    const result = await conn.query(
      `UPDATE accounts
      SET name = ?, diachi = ?
      WHERE id = ?`,
      [name, diachi, accountId]
    );
    res.json({
      message: `Successfully updated inf for account with id ${accountId}.`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
});

// Endpoint DELETE /deleteAccount/:id
app.delete("/deleteAccount/:id", async (req, res) => {
  const accountId = req.params.id;
  let conn;
  try {
    conn = await db.getConnection();
    const result = await conn.query(
      `DELETE FROM accounts
      WHERE id = ?`,
      [accountId]
    );
    res.json({
      message: `Successfully deleted account with id ${accountId}.`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
});

// Endpoint DELETE /deleteItem/:id
app.delete("/deleteItem/:id", async (req, res) => {
  const itemId = req.params.id;
  let conn;
  try {
    conn = await db.getConnection();
    const result = await conn.query(
      `DELETE FROM items
      WHERE id = ?`,
      [itemId]
    );
    res.json({
      message: `Successfully deleted item with id ${itemId}.`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
});
// Endpoint POST /book
app.post("/book", async (req, res) => {
  const {
    hotel_name,
    price,
    booking_date,
    number_of_guests,
    payment_type,
    total_price,
  } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (
    !hotel_name ||
    !price ||
    !booking_date ||
    !number_of_guests ||
    !payment_type ||
    !total_price
  ) {
    return res
      .status(400)
      .json({ error: "Tất cả các trường đều phải được cung cấp." });
  }

  let conn;
  try {
    conn = await db.getConnection();

    // Thực hiện truy vấn
    const result = await conn.query(
      `INSERT INTO booking_history (hotel_name, price, booking_date, number_of_guests, payment_type, total_price) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        hotel_name,
        parseFloat(price),
        booking_date,
        number_of_guests,
        payment_type,
        parseFloat(total_price),
      ]
    );

    res
      .status(201)
      .json({
        message: "Booking saved successfully!",
        bookingId: result.insertId,
      });
  } catch (err) {
    console.error("Error saving booking:", err); // Log lỗi để kiểm tra
    res.status(500).json({ error: "Đã xảy ra lỗi khi lưu dữ liệu." });
  } finally {
    if (conn) conn.release();
  }
});

// Endpoint GET /bookings
app.get("/bookings", async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();
    const rows = await conn.query("SELECT * FROM booking_history");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
