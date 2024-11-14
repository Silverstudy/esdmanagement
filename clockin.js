// 获取DOM元素
const loginBtn = document.getElementById("login-btn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("login-form");
const usernameDisplay = document.getElementById("username-display");
const clockInBtn = document.getElementById("clock-in-btn");
const clockOutBtn = document.getElementById("clock-out-btn");
const pauseBtn = document.getElementById("pause-btn");
const logoutBtn = document.getElementById("logout-btn");

// 登录逻辑
loginBtn.addEventListener("click", async () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  if (!username || !password) {
    errorMessage.textContent = "请输入用户名和密码";
    return;
  }

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("username", data.username);
    usernameDisplay.textContent = data.username;
    loginForm.style.display = "none";
    dashboard.style.display = "block";
  } else {
    errorMessage.textContent = data.message || "登录失败";
  }
});

// 打卡逻辑
clockInBtn.addEventListener("click", () => {
  handlePunch("clock_in");
});

clockOutBtn.addEventListener("click", () => {
  handlePunch("clock_out");
});

pauseBtn.addEventListener("click", () => {
  handlePunch("pause");
});

async function handlePunch(punchType) {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    alert("请先登录");
    return;
  }

  const response = await fetch("http://localhost:3000/punch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, punchType }),
  });

  const data = await response.text();
  alert(data);
}

// 登出逻辑
logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  loginForm.style.display = "block";
  dashboard.style.display = "none";
});
