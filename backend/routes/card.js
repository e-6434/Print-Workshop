const express = require("express");
const router = express.Router();
const { 
  get_All_Cards
} = require("../controllers/usersController");

 
router.get("/", get_All_Cards);
 
  
module.exports = router;