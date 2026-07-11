const express = require("express");
const router = express.Router();
const { 
  get_All_News
} = require("../controllers/usersController");

 
router.get("/", get_All_News);
 
  
module.exports = router;