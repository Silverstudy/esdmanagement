const express = require("express");
const bodyParser = require("body-parser");
const employees = require("./api/employees");
const app = express();
const PORT = 3000;

// 中间件
app.use(bodyParser.json());
app.use(express.static("public"));

// 路由
app.use("/api/employees", employees);

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
