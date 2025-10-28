// ===== student.js =====

// Show selected section only
function showSection(sectionId, link) {
  const sections = document.querySelectorAll('section');
  const links = document.querySelectorAll('.menu li a');

  // Hide all sections
  sections.forEach(sec => sec.classList.remove('active'));

  // Show chosen section
  document.getElementById(sectionId).classList.add('active');

  // Highlight active link
  links.forEach(a => a.classList.remove('active'));
  link.classList.add('active');
}

// Preview profile picture before upload
function previewImage(event) {
  const reader = new FileReader();
  reader.onload = function() {
    document.getElementById('profileImage').src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}


/*admin*/

// ===== LOGIN PAGE =====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    // Admin login
    if (email === "admin@lspu.edu.ph" && password === "admin123") {
      localStorage.setItem('loggedInRole', 'admin');
      window.location.href = "admin.html";
      return;
    }

    // Student login (create account if not exist)
    let students = JSON.parse(localStorage.getItem('studentAccounts')) || [];
    let user = students.find(s => s.email === email && s.password === password);

    if (user) {
      localStorage.setItem('loggedInRole', 'student');
      localStorage.setItem('currentStudent', JSON.stringify(user));
      window.location.href = "studentdashboard.html";
    } else {
      alert("Account not found. Please create one first.");
    }
  });

  // Create sample student account
  document.getElementById('createStudent').addEventListener('click', () => {
    const name = prompt("Enter your full name:");
    const email = prompt("Enter your email:");
    const password = prompt("Create a password:");
    if (name && email && password) {
      let accounts = JSON.parse(localStorage.getItem('studentAccounts')) || [];
      accounts.push({ name, email, password });
      localStorage.setItem('studentAccounts', JSON.stringify(accounts));
      alert("Account created! You can now log in.");
    }
  });
}

// ===== STUDENT DASHBOARD =====
const studentForm = document.getElementById('studentForm');
if (studentForm) {
  const studentData = JSON.parse(localStorage.getItem('currentStudent'));
  if (!studentData) {
    window.location.href = "login.html";
  }

  studentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const course = document.getElementById('course').value;
    const gcash = document.getElementById('gcash').value.trim();
    const amount = document.getElementById('amount').value.trim();

    const newRecord = { name, email, course, gcash, amount, date: new Date().toLocaleString() };

    let students = JSON.parse(localStorage.getItem('enrolledStudents')) || [];
    students.push(newRecord);
    localStorage.setItem('enrolledStudents', JSON.stringify(students));

    alert("Enrollment submitted successfully!");
    studentForm.reset();
  });

  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('loggedInRole');
    window.location.href = "login.html";
  });
}

// ===== ADMIN DASHBOARD =====
const tableBody = document.querySelector('#studentTable tbody');
if (tableBody) {
  const role = localStorage.getItem('loggedInRole');
  if (role !== 'admin') {
    window.location.href = "login.html";
  }

  const students = JSON.parse(localStorage.getItem('enrolledStudents')) || [];
  if (students.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5">No student records found.</td></tr>`;
  } else {
    tableBody.innerHTML = students.map(s => `
      <tr>
        <td>${s.name}</td>
        <td>${s.email}</td>
        <td>${s.course}</td>
        <td>${s.gcash}</td>
        <td>₱${s.amount}</td>
      </tr>
    `).join('');
  }

  document.getElementById('logoutAdmin').addEventListener('click', () => {
    localStorage.removeItem('loggedInRole');
    window.location.href = "login.html";
  });
}

 const students = [
      { name: 'Lance Landicho', id: '2025-001', email: 'lance@lspu.edu.ph', course: 'BSIT', status: 'Enrolled' },
      { name: 'Maria Santos', id: '2025-002', email: 'maria@lspu.edu.ph', course: 'BSEd', status: 'Paid' },
      { name: 'John Dela Cruz', id: '2025-003', email: 'john@lspu.edu.ph', course: 'BSBA', status: 'Pending' },
      { name: 'Anna Reyes', id: '2025-004', email: 'anna@lspu.edu.ph', course: 'BSIT', status: 'Enrolled' }
    ];

    const tableSection = document.querySelector('#studentTable tbody');
    const totalStudents = document.getElementById('totalStudents');
    const bsitCount = document.getElementById('bsitCount');
    const bsedCount = document.getElementById('bsedCount');
    const bsbaCount = document.getElementById('bsbaCount');

    function loadStudents() {
      tableBody.innerHTML = '';
      let bsit = 0, bsed = 0, bsba = 0;

      students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${student.name}</td>
          <td>${student.id}</td>
          <td>${student.email}</td>
          <td>${student.course}</td>
          <td>${student.status}</td>
        `;
        tableBody.appendChild(row);

        // Count per course
        if (student.course === 'BSIT') bsit++;
        else if (student.course === 'BSEd') bsed++;
        else if (student.course === 'BSBA') bsba++;
      });

      totalStudents.textContent = students.length;
      bsitCount.textContent = bsit;
      bsedCount.textContent = bsed;
      bsbaCount.textContent = bsba;
    }

    loadStudents();
  

  
