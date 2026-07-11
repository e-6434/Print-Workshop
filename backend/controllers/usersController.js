const { 
  getAllUsers, 
  getUserById, 
  getUserByUsernameAndPassword,
  getNews,
  getCards,
    
} = require("../models/usersModel");


async function fetchAllUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
}


//دیتای اطلاعیه ها
async function get_All_News(req, res) {
  try {
    const news = await getNews();
    res.json(news);
  } catch (error) {
     res.status(500).json({
      success: false,
      message: "خطای داخلی سرور"
    });
  }
}

//دیتای کارت ها
async function get_All_Cards(req, res) {
  try {
    const cards = await getCards();  // ✅ تغییر: const news -> const cards
    res.json(cards);
  } catch (error) {
     res.status(500).json({
      success: false,
      message: "خطای داخلی سرور"
    });
  }
}


async function fetchUserById(req, res) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// متد جدید برای لاگین
async function login(req, res) {
  try {
    const { username, password, remember_me } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "کد پرسنلی و رمز عبور الزامی است"
      });
    }

    const user = await getUserByUsernameAndPassword(username, password);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "کد پرسنلی یا رمز عبور اشتباه است"
      });
    }

    res.json({
      success: true,
      message: "ورود موفقیت‌آمیز",
      user: user
    });

  } catch (error) {
    console.error("خطا در لاگین:", error);
    res.status(500).json({
      success: false,
      message: "خطای داخلی سرور"
    });
  }
}

function logout(req, res) {
  res.json({
    success: true,
    message: "خروج موفقیت‌آمیز"
  });
}



module.exports = { 
  fetchAllUsers, 
  fetchUserById, 
  login,
  logout,

  get_All_News,
  get_All_Cards
};