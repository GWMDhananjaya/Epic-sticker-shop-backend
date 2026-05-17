/* eslint-env node */

const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting:", err);
    return;
  }
  console.log("Connected to MySQL");

  // Create database
  connection.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
    (err) => {
      if (err) {
        console.error("Error creating database:", err);
        return;
      }
      console.log("Database created or exists");

      // Use the database
      connection.changeUser({ database: process.env.DB_NAME }, (err) => {
        if (err) {
          console.error("Error switching to database:", err);
          return;
        }

        // Create Admins table
        const createAdminsTable = `
                CREATE TABLE IF NOT EXISTS Admins (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;

        // Create Products table
        const createProductsTable = `
                CREATE TABLE IF NOT EXISTS Products (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    align VARCHAR(50) DEFAULT 'left',
                    image TEXT NOT NULL,
                    description TEXT NOT NULL,
                    price VARCHAR(100) NOT NULL,
                    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;

        connection.query(createAdminsTable, (err) => {
          if (err) console.error("Error creating Admins table:", err);
          else console.log("Admins table ready");
        });

        connection.query(createProductsTable, (err) => {
          if (err) console.error("Error creating Products table:", err);
          else console.log("Products table ready");
        });

        console.log("✅ Database setup complete!");
        connection.end();
      });
    },
  );
});
