// const express = require("express");
// const mysql = require("mysql2");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const app = express();

// // 中间件配置
// app.use(express.json()); // 用于解析 JSON 请求体

// // 创建 MySQL 连接
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "your_password",
//   database: "attendance_system",
// });

// // 连接数据库
// db.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to the database");
// });

// // 登录接口
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   db.query(
//     "SELECT * FROM users WHERE username = ?",
//     [username],
//     (err, result) => {
//       if (err) return res.status(500).send("Database error");
//       if (result.length === 0) return res.status(404).send("User not found");

//       const user = result[0];
//       bcrypt.compare(password, user.password, (err, isMatch) => {
//         if (err) return res.status(500).send("Error comparing passwords");
//         if (!isMatch) return res.status(400).send("Invalid credentials");

//         const token = jwt.sign({ id: user.id }, "your_jwt_secret");
//         res.json({ token, userId: user.id, username: user.username });
//       });
//     }
//   );
// });

// // 打卡接口
// app.post("/punch", (req, res) => {
//   const { userId, punchType } = req.body;

//   if (!userId || !punchType)
//     return res.status(400).send("Missing required fields");

//   const punchTime = new Date();
//   db.query(
//     "INSERT INTO attendance (user_id, punch_type, punch_time) VALUES (?, ?, ?)",
//     [userId, punchType, punchTime],
//     (err, result) => {
//       if (err) return res.status(500).send("Error inserting punch record");
//       res.send("Punch record added");
//     }
//   );
// });

// // 启动服务器
// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const app = express();

// // 中间件配置
// app.use(express.json()); // 用于解析 JSON 请求体

// // 模拟的硬编码用户名和密码
// const testUser = {
//   username: "testuser", // 测试用户名
//   password: "password123", // 测试密码
//   id: 1, // 用户ID
// };

// // 登录接口
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   // 验证用户名
//   if (username !== testUser.username) {
//     return res.status(404).send("User not found");
//   }

//   // 验证密码
//   if (password !== testUser.password) {
//     return res.status(400).send("Invalid credentials");
//   }

//   // 生成JWT token
//   const token = jwt.sign({ id: testUser.id }, "your_jwt_secret");
//   res.json({ token, userId: testUser.id, username: testUser.username });
// });

// // 打卡接口
// app.post("/punch", (req, res) => {
//   const { userId, punchType } = req.body;

//   if (!userId || !punchType)
//     return res.status(400).send("Missing required fields");

//   const punchTime = new Date();
//   console.log(`User ${userId} punched: ${punchType} at ${punchTime}`);
//   res.send("Punch record added");
// });

// // 启动服务器
// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

require("dotenv").config(); // 加载环境变量

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const app = express();

// 中间件配置
app.use(express.json()); // 用于解析 JSON 请求体

// 数据库连接配置
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD, // 使用环境变量
  database: "attendance_system",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database.");
});

// 模拟的硬编码用户名和密码
const testUser = {
  username: "testuser", // 测试用户名
  password: bcrypt.hashSync("password123", 10), // 加密后的密码
  id: 1, // 用户ID
};

// 登录接口
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 验证用户名
  if (username !== testUser.username) {
    return res.status(404).send("User not found");
  }

  // 验证密码
  bcrypt.compare(password, testUser.password, (err, isMatch) => {
    if (err) return res.status(500).send("Error comparing passwords");
    if (!isMatch) return res.status(400).send("Invalid credentials");

    // 生成JWT token
    const token = jwt.sign({ id: testUser.id }, process.env.JWT_SECRET);
    res.json({ token, userId: testUser.id, username: testUser.username });
  });
});

// 打卡接口
app.post("/punch", (req, res) => {
  const { userId, punchType } = req.body;

  if (!userId || !punchType)
    return res.status(400).send("Missing required fields");

  const punchTime = new Date();
  console.log(`User ${userId} punched: ${punchType} at ${punchTime}`);

  // 将打卡记录插入数据库
  db.query(
    "INSERT INTO attendance (user_id, punch_type, punch_time) VALUES (?, ?, ?)",
    [userId, punchType, punchTime],
    (err, result) => {
      if (err) return res.status(500).send("Error inserting punch record");
      res.send("Punch record added");
    }
  );
});

// 启动服务器
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
