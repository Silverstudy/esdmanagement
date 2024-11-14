// employee.js
document.addEventListener("DOMContentLoaded", () => {
  const employeeTable = document.getElementById("employee-body");
  const modal = document.getElementById("modal");
  const addEmployeeBtn = document.getElementById("add-employee-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const employeeForm = document.getElementById("employee-form");

  let editingEmployeeId = null;

  // Fetch and display employees
  function fetchEmployees() {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data) => {
        employeeTable.innerHTML = "";
        data.forEach((employee) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.address}</td>
            <td>${employee.employee_id}</td>
            <td>${employee.usi}</td>
            <td>${employee.hire_date}</td>
            <td>${employee.email}</td>
            <td>${employee.phone}</td>
            <td>${employee.years}</td>
            <td>${employee.salary}</td>
            <td>
              <button class="edit-btn" data-id="${employee.id}">Edit</button>
              <button class="delete-btn" data-id="${employee.id}">Delete</button>
            </td>
          `;
          employeeTable.appendChild(row);
        });

        addEditListeners();
        addDeleteListeners();
      });
  }

  // Add listeners for edit buttons
  function addEditListeners() {
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        editingEmployeeId = e.target.dataset.id;
        fetch(`/api/employees/${editingEmployeeId}`)
          .then((res) => res.json())
          .then((data) => {
            Object.keys(data).forEach((key) => {
              const input = document.querySelector(`#${key}`);
              if (input) input.value = data[key];
            });
            modal.style.display = "flex";
          });
      });
    });
  }

  // Add listeners for delete buttons
  function addDeleteListeners() {
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        fetch(`/api/employees/${id}`, { method: "DELETE" }).then(() =>
          fetchEmployees()
        );
      });
    });
  }

  // Handle form submission
  employeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(employeeForm);
    const data = Object.fromEntries(formData.entries());
    const method = editingEmployeeId ? "PUT" : "POST";
    const url = editingEmployeeId
      ? `/api/employees/${editingEmployeeId}`
      : "/api/employees";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      modal.style.display = "none";
      fetchEmployees();
    });
  });

  // Open modal for adding new employee
  addEmployeeBtn.addEventListener("click", () => {
    editingEmployeeId = null;
    employeeForm.reset();
    modal.style.display = "flex";
  });

  // Close modal
  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Initial fetch
  fetchEmployees();
});

const express = require("express");
const db = require("../database");
const router = express.Router();

// 获取所有员工信息
router.get("/", (req, res) => {
  const query = "SELECT * FROM employees";
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// 获取单个员工信息
router.get("/:id", (req, res) => {
  const query = "SELECT * FROM employees WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

// 添加新员工
router.post("/", (req, res) => {
  const query = "INSERT INTO employees SET ?";
  db.query(query, req.body, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true });
  });
});

// 更新员工信息
router.put("/:id", (req, res) => {
  const query = "UPDATE employees SET ? WHERE id = ?";
  db.query(query, [req.body, req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true });
  });
});

// 删除员工
router.delete("/:id", (req, res) => {
  const query = "DELETE FROM employees WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true });
  });
});

module.exports = router;
