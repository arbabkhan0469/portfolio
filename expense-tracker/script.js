const nameInput = document.getElementById("nameInput");
const amountInput = document.getElementById("amountInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("expenseList");
const totalEl = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editIndex = null;

function save() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function resetForm() {
  nameInput.value = "";
  amountInput.value = "";
  addBtn.textContent = "Add";
  editIndex = null;
}

function render() {
  list.innerHTML = "";
  let total = 0;

  expenses.forEach(function (item, index) {
    total += item.amount;

    const li = document.createElement("li");
    li.textContent = item.name + " - Rs " + item.amount;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () {
      nameInput.value = item.name;
      amountInput.value = item.amount;
      addBtn.textContent = "Save";
      editIndex = index;
      nameInput.focus();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", function () {
      expenses.splice(index, 1);
      save();
      resetForm();
      render();
    });

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });

  totalEl.textContent = "Total: Rs " + total;
}

addBtn.addEventListener("click", function () {
  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);

  if (name === "" || amount <= 0) return;

  if (editIndex === null) {
    expenses.push({ name: name, amount: amount });
  } else {
    expenses[editIndex] = { name: name, amount: amount };
  }

  save();
  resetForm();
  render();
});

render();
