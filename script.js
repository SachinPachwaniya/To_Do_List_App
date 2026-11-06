
const input = document.getElementById("input");
const addbutton = document.getElementById("addButton");
const taskslist = document.getElementById("taskslist");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    taskslist.innerHTML = "";

    tasks.forEach(function (task, index) {
        const li = document.createElement("li");
        const deleteButton = document.createElement("button");
        const checkBox = document.createElement("input");

        const taskText = document.createElement("span");
        const actions = document.createElement("div");

        // Task text
        taskText.textContent = task.text;

        // Checkbox
        checkBox.type = "checkbox";
        checkBox.checked = task.completed;

        if (task.completed) {
            li.classList.add("completed");
        }

        checkBox.addEventListener("change", function () {
            task.completed = checkBox.checked;
            saveTasks();
            loadTasks();
        });

        // Delete button
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            loadTasks();
        });

        // Group checkbox and delete button
        actions.classList.add("task-actions");
        actions.appendChild(deleteButton);
        actions.appendChild(checkBox);

        // Append elements to li
        li.appendChild(taskText);
        li.appendChild(actions);

        taskslist.appendChild(li);
    });
}

// Load saved tasks
loadTasks();

// Add new task
addbutton.addEventListener("click", function () {

    if (input.value.trim() === "") {
        alert("Add your tasks first");
    }
    else {
        const task = input.value.trim();

        tasks.push({
            text: task,
            completed: false
        });

        saveTasks();
        loadTasks();

        input.value = "";
    }
});
