let inp = document.querySelector("input");
let btn = document.querySelector("button");
let ul = document.querySelector("ul");
let h2 = document.querySelector("h2");

document.addEventListener("DOMContentLoaded", function() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTaskToList(task);
    });
    if (tasks.length > 0) {
        h2.style.display = "none";  // Hide h2 if there are tasks
    }
});

btn.addEventListener("click", function() {
    if (inp.value.trim() == "") {
        alert("Please enter a task");
        return;
    }
    let taskValue = inp.value;
    addTaskToList(taskValue);
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskValue);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    inp.value = "";
    h2.style.display = "none";  // Hide h2 when a new task is added
});

function addTaskToList(taskValue) {
    let newLi = document.createElement("li");
    newLi.innerHTML = "&#8226;" + taskValue;

    let delBtn = document.createElement("button");
    delBtn.innerHTML = "<i></i>";
    delBtn.classList.add("del", "btn", "btn-danger", "fa-solid", "fa-trash-can");
    newLi.appendChild(delBtn);
    ul.appendChild(newLi);
}

ul.addEventListener("contextmenu", function(event) {
    event.preventDefault();
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("line-through");
    }
});

ul.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        let listItem = event.target.parentElement;
        let taskText = listItem.innerText.trim().slice(1);  // Remove bullet and trim
        listItem.remove();

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task !== taskText);  // Remove task from array
        localStorage.setItem("tasks", JSON.stringify(tasks));

        if (tasks.length === 0) {
            h2.style.display = "block";  // Show h2 when all tasks are deleted
        }
    }
});
