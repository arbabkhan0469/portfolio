const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

function addTask() {
  const text = input.value.trim();
  if (text === "") return;

  const li = document.createElement("li");
  li.textContent = text;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", function () {
    li.remove();
  });
  li.appendChild(delBtn);

  list.appendChild(li);
  input.value = "";
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
