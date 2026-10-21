const addButton = document.querySelector(".addTask");
const inputData = document.querySelector(".taskInput");
const inputDate = document.querySelector(".dateInput");
const inputTime = document.querySelector(".timeInput");
const container = document.querySelector(".container");
const search = document.querySelector(".searchInput");
const errorPopup = document.querySelector(".errorPopup");
const okButton = document.querySelector(".okButton");
okButton.addEventListener("click", () => {
    errorPopup.style.display = "none";
});
search.addEventListener("input", () => {
    const searchText = search.value.toLowerCase();
    const taskElements = document.querySelectorAll(".todayTasks div, .upcomingTasks div, .dueTasks div");
    taskElements.forEach((taskElement) => {
        const taskText = taskElement.querySelector("p")?.textContent.toLowerCase() || "";
        if (taskText.includes(searchText)) {
            taskElement.style.display = "";
        } else {
            taskElement.style.display = "none";
        }
    });
});
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const displayTask = (task) => {
    const taskData = document.createElement("div");
    taskData.innerHTML = `<h3>${task.date}</h3>
    <div class="editAndDeleteInSameRow">
    <p class="enteredTask">${task.task} ${task.time}</p>
    <div class="buttons">
    <button class="editButton">Edit</button>
    <button class="deleteButton">Delete</button>
    </div>
    </div>`;
    const today = new Date().toLocaleDateString("en-CA");
    let taskHeading;
    const taskDate = task.date;
    if (taskDate === today) {
        taskHeading = document.querySelector(".todayTasks");
    } else if (taskDate > today) {
        taskHeading = document.querySelector(".upcomingTasks");
    } else {
        taskHeading = document.querySelector(".dueTasks");
    }
    const editing = taskData.querySelector(".editButton");
    const deleting = taskData.querySelector(".deleteButton");
    editing.addEventListener("click", () => {
        inputData.value = task.task;
        inputDate.value = task.date;
        inputTime.value = task.time;
        tasks = tasks.filter(item => item !== task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskData.remove();
    });
    deleting.addEventListener("click", () => {
        tasks = tasks.filter(item => item !== task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskData.remove();
    });
    taskHeading.appendChild(taskData);};
tasks.forEach(displayTask);
const addData = () => {
    const task = inputData.value;
    const date = inputDate.value;
    const time = inputTime.value;
    if (task === "" || date === "" || time === "") {
        errorPopup.style.display = "block";
        return;
    }
    const taskData = {
        task: task,
        date: date,
        time: time
    };
    tasks.push(taskData);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTask(taskData);
    inputData.value = "";
    inputDate.value = "";
    inputTime.value = "";
};
addButton.addEventListener("click", addData);