const { pool } = require("../db");

// دریافت همه کاربران (از جدول personal)
async function getAllUsers() {
  try {
    const [rows] = await pool.execute("SELECT * FROM personal");
    return rows;
  } catch (error) {
    console.error("خطا در دریافت کاربران:", error);
    throw error;
  }
}

// دریافت اطلاعات اخبار
async function getNews() {
  try {
    const [rows] = await pool.execute(`
      SELECT *
      FROM news
      ORDER BY Id DESC
    `);
    return rows;
  } catch (error) {
    console.error("خطا در دریافت اخبار:", error);
    throw error;
  }
}

// دریافت اطلاعات کارت‌ها
async function getCards() {
  try {
    const [rows] = await pool.execute(`
      SELECT *
      FROM card
      ORDER BY Id DESC
    `);
    return rows;
  } catch (error) {
    console.error("خطا در دریافت کارت:", error);
    throw error;
  }
}

// دریافت کاربر بر اساس کد پرسنلی (personaly)
async function getUserById(id) {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM personal WHERE personaly = ?",
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error("خطا در دریافت کاربر:", error);
    throw error;
  }
}

// متد لاگین با کد پرسنلی و رمز عبور
async function getUserByUsernameAndPassword(username, password) {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM personal WHERE personaly = ? AND pass = ?",
      [username, password]
    );
    return rows[0] || null;
  } catch (error) {
    console.error("خطا در لاگین:", error);
    throw error;
  }
}





module.exports = { 
  getAllUsers, 
  getUserById, 
  getUserByUsernameAndPassword,
  getNews,
  getCards
};