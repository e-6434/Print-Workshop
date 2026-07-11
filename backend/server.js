const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const usersRoutes = require("./routes/users");
const newsRoutes = require("./routes/news");
const cardRoutes = require("./routes/card");

app.use("/users", usersRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/card", cardRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));



