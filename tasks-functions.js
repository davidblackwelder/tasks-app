// Read existing notes from localStorage
const getSavedTasks = function () {
  const tasksJSON = localStorage.getItem("tasks");

  if (tasksJSON !== null) {
    return JSON.parse(tasksJSON);
  } else {
    return [];
  }
};

// Save tasks to localStorage
const saveTasks = function (tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Render application tasks based on filters
const renderTasks = function (tasks, filters) {
  const filteredTasks = tasks.filter(function (task) {
    const searchTextMatch = task.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !task.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTasks = filteredTasks.filter(function (task) {
    return !task.completed;
  });

  document.querySelector("#tasks").innerHTML = "";

  document
    .querySelector("#tasks")
    .appendChild(generateSummaryDOM(incompleteTasks));

  filteredTasks.forEach(function (task) {
    document.querySelector("#tasks").appendChild(generateTaskDOM(task));
  });
};

// Get the DOM elements for an individual task
const generateTaskDOM = function (task) {
  const taskEl = document.createElement("div");
  const checkBox = document.createElement("input");
  const taskTextEl = document.createElement("span");
  const button = document.createElement("button");

  // Setup task checkbox
  checkBox.setAttribute("type", "checkbox");
  taskEl.appendChild(checkBox);

  // Setup the task text
  taskTextEl.textContent = task.text;
  taskEl.appendChild(taskTextEl);

  // Setup the remove task button
  button.textContent = "x";
  taskEl.appendChild(button);

  return taskEl;
};

// Get the DOM elements for list summary
const generateSummaryDOM = function (incompleteTasks) {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTasks.length} tasks left to complete`;
  return summary;
};
