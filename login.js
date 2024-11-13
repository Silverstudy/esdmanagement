document.addEventListener("DOMContentLoaded", function () {
  // 获取登录表单元素
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("error-message");

  // 确保表单存在
  if (loginForm) {
    // 添加表单提交事件监听
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // 阻止表单提交

      // 获取用户名和密码
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // 登录验证（可以根据实际需求修改）
      if (username === "admin" && password === "password123") {
        // 登录成功，保存用户名并跳转到主页面
        localStorage.setItem("username", username);
        window.location.href = "index.html"; // 重定向到主页面
      } else {
        // 登录失败，显示错误消息
        errorMessage.textContent = "Invalid username or password";
      }
    });
  }
});
