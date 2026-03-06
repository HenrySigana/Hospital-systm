// Sidebar toggle
const toggleButton = document.querySelector(".sidebar-toggle");
const sidebar = document.querySelector(".sidebar");
toggleButton.addEventListener("click", () => {
  sidebar.style.display = sidebar.style.display === "flex" ? "none" : "flex";
});

// Patient search filter
const searchInput = document.getElementById("patientSearch");
const patientTableBody = document.getElementById("patientTable").getElementsByTagName("tbody")[0];

searchInput.addEventListener("keyup", function () {
  const filter = searchInput.value.toLowerCase();
  const rows = patientTableBody.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    let match = false;
    for (let j = 0; j < cells.length - 1; j++) {
      if (cells[j].innerText.toLowerCase().includes(filter)) match = true;
    }
    rows[i].style.display = match ? "" : "none";
  }
});

// Modal
const addPatientBtn = document.getElementById("addPatientBtn");
const modal = document.getElementById("addPatientModal");
const closeBtn = modal.querySelector(".close");
const addPatientForm = document.getElementById("addPatientForm");

// Open modal
addPatientBtn.addEventListener("click", () => modal.style.display = "block");

// Close modal
closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => { if(e.target == modal) modal.style.display = "none"; });

// CRUD Functions
function handlePatientActions(row) {
  const editBtn = row.querySelector(".btn-primary");
  const deleteBtn = row.querySelector(".btn-danger");

  editBtn.addEventListener("click", () => {
    const cells = row.getElementsByTagName("td");
    document.getElementById("patientId").value = cells[0].innerText;
    document.getElementById("patientName").value = cells[1].innerText;
    document.getElementById("patientAge").value = cells[2].innerText;
    document.getElementById("patientGender").value = cells[3].innerText;
    document.getElementById("admissionDate").value = cells[4].innerText;
    modal.style.display = "block";

    addPatientForm.onsubmit = function(e) {
      e.preventDefault();
      cells[0].innerText = document.getElementById("patientId").value;
      cells[1].innerText = document.getElementById("patientName").value;
      cells[2].innerText = document.getElementById("patientAge").value;
      cells[3].innerText = document.getElementById("patientGender").value;
      cells[4].innerText = document.getElementById("admissionDate").value;
      addPatientForm.reset();
      modal.style.display = "none";
      bindAddPatientForm();
    };
  });

  deleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this patient?")) row.remove();
  });
}

function bindExistingRows() {
  const rows = patientTableBody.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) handlePatientActions(rows[i]);
}

function bindAddPatientForm() {
  addPatientForm.onsubmit = function(e) {
    e.preventDefault();
    const id = document.getElementById("patientId").value;
    const name = document.getElementById("patientName").value;
    const age = document.getElementById("patientAge").value;
    const gender = document.getElementById("patientGender").value;
    const date = document.getElementById("admissionDate").value;

    const newRow = patientTableBody.insertRow();
    newRow.innerHTML = `
      <td>${id}</td>
      <td>${name}</td>
      <td>${age}</td>
      <td>${gender}</td>
      <td>${date}</td>
      <td>
        <button class="btn-primary"><i class="fas fa-edit"></i> Edit</button>
        <button class="btn-danger"><i class="fas fa-trash"></i> Delete</button>
      </td>
    `;
    handlePatientActions(newRow);
    addPatientForm.reset();
    modal.style.display = "none";
  };
}

// Initial binding
bindExistingRows();
bindAddPatientForm();
