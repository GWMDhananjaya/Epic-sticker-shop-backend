/* eslint-env node */
/* eslint-disable no-undef, no-unused-vars */

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();

// Middleware


 //hosting *************************
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}));
 //hosting *************************





app.use(express.json());
 //hosting *************************
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
 //hosting *************************


 

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📁 Uploads folder created");
}

// Configure Multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, "product-" + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter,
});

// MySQL Connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "epic_shop",
  waitForConnections: true,
  connectionLimit: 10,
});

const promisePool = pool.promise();

// Test connection
(async () => {
  try {
    const [result] = await promisePool.query("SELECT 1");
    console.log("✅ MySQL connected successfully");
  } catch (error) {
    console.error("❌ MySQL connection failed:", error.message);
    console.log("Please check your MySQL credentials in .env file");
  }
})();

// Verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    req.admin = verified;
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(401).json({ msg: "Invalid token" });
  }
};

// Error handler for multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("Multer error:", err);
    return res.status(400).json({ msg: err.message });
  }
  next(err);
});

// ========== ROUTES ==========

// Register
app.post("/api/admin/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Register attempt:", username);

    const [existing] = await promisePool.query(
      "SELECT * FROM Admins WHERE username = ?",
      [username],
    );
    if (existing.length > 0) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await promisePool.query(
      "INSERT INTO Admins (username, password) VALUES (?, ?)",
      [username, hashedPassword],
    );

    console.log("Admin registered:", username);
    res.json({ msg: "Admin created successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ msg: "Server error: " + err.message });
  }
});

// Login
app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt:", username);

    const [admins] = await promisePool.query(
      "SELECT * FROM Admins WHERE username = ?",
      [username],
    );
    if (admins.length === 0) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, admins[0].password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admins[0].id, username: admins[0].username },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "24h" },
    );

    console.log("Login successful:", username);
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const [products] = await promisePool.query(
      "SELECT * FROM Products ORDER BY createdAt DESC",
    );
    console.log(`Fetched ${products.length} products`);
    res.json(products);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Add product with image upload
app.post(
  "/api/products",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("=== NEW PRODUCT REQUEST ===");
      console.log("Headers:", req.headers);
      console.log("Body:", req.body);
      console.log("File:", req.file);

      const { name, align, description, price } = req.body;

      // Validate required fields
      if (!name) {
        console.log("Missing name");
        return res.status(400).json({ msg: "Product name is required" });
      }
      if (!description) {
        console.log("Missing description");
        return res.status(400).json({ msg: "Description is required" });
      }
      if (!price) {
        console.log("Missing price");
        return res.status(400).json({ msg: "Price is required" });
      }
      if (!req.file) {
        console.log("Missing image file");
        return res.status(400).json({ msg: "Product image is required" });
      }

      const imagePath = `/uploads/${req.file.filename}`;

      console.log("Inserting product into database:", {
        name,
        align,
        description,
        price,
        imagePath,
      });

      const [result] = await promisePool.query(
        "INSERT INTO Products (name, align, image, description, price) VALUES (?, ?, ?, ?, ?)",
        [name, align || "left", imagePath, description, price],
      );

      console.log("Product inserted with ID:", result.insertId);

      const [newProduct] = await promisePool.query(
        "SELECT * FROM Products WHERE id = ?",
        [result.insertId],
      );

      console.log("Product added successfully:", newProduct[0]);
      console.log("=== REQUEST COMPLETED ===");

      res.json(newProduct[0]);
    } catch (err) {
      console.error("=== ERROR IN ADD PRODUCT ===");
      console.error("Error details:", err);
      console.error("Error message:", err.message);
      console.error("Error stack:", err.stack);
      res.status(500).json({ msg: "Error adding product: " + err.message });
    }
  },
);

// Delete product
app.delete("/api/products/:id", verifyToken, async (req, res) => {
  try {
    console.log("Delete product ID:", req.params.id);

    const [product] = await promisePool.query(
      "SELECT image FROM Products WHERE id = ?",
      [req.params.id],
    );

    const [result] = await promisePool.query(
      "DELETE FROM Products WHERE id = ?",
      [req.params.id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }

    if (product[0] && product[0].image) {
      const imagePath = path.join(__dirname, product[0].image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("Deleted image:", imagePath);
      }
    }

    console.log("Product deleted successfully");
    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ msg: "Error deleting product" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads folder: ${path.join(__dirname, "uploads")}`);
  console.log(`\n📊 Available endpoints:`);
  console.log(`   POST   http://localhost:${PORT}/api/admin/register`);
  console.log(`   POST   http://localhost:${PORT}/api/admin/login`);
  console.log(`   GET    http://localhost:${PORT}/api/products`);
  console.log(
    `   POST   http://localhost:${PORT}/api/products (requires auth & image)`,
  );
  console.log(
    `   DELETE http://localhost:${PORT}/api/products/:id (requires auth)`,
  );
  console.log(`\n✅ Ready to accept connections!\n`);
});
