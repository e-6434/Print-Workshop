const express = require("express");
const router = express.Router();
const { 
  fetchAllUsers, 
  fetchUserById, 
  login,
  logout, 
  get_All_News
} = require("../controllers/usersController");

// روت‌های قبلی
router.get("/", fetchAllUsers);
router.get("/:id", fetchUserById);
// router.get("/news", get_All_News);  ???????????????????????

// روت جدید لاگین
router.post("/login", login);

// روت خروج
router.post("/logout", logout);
//روت دیتای مرخصی

  
module.exports = router;