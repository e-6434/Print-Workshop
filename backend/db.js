const mysql = require("mysql2");
require("dotenv").config();

// پیکربندی اتصال به MySQL (XAMPP)
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "tavana",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// تبدیل به Promise برای استفاده با async/await
const poolPromise = pool.promise();

// تست اتصال
poolPromise.getConnection()
  .then(connection => {
    console.log("✅ MySQL Connected Successfully!");
    connection.release();
  })
  .catch(err => {
    console.error("❌ MySQL Connection Failed:", err.message);
  });

// فقط همین خط را تغییر دهید
module.exports = { pool: poolPromise };  // حذف کردم mysql, چون استفاده نمی‌شود