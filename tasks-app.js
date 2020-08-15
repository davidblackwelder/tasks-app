const tasks = getSavedTasks();

const filters = {
	searchText: "",
	hideCompleted: false,
};

renderTasks(tasks, filters);

document.querySelector("#search-text").addEventListener("input", function (e) {
	filters.searchText = e.target.value;
	renderTasks(tasks, filters);
});

document.querySelector("#create-task").addEventListener("submit", function (e) {
	e.preventDefault();
	tasks.push({
		id: uuidv4(),
		text: e.target.elements.newTask.value,
		completed: false,
	});
	saveTasks(tasks);
	renderTasks(tasks, filters);
	e.target.elements.newTask.value = "";
});

document
	.querySelector("#hide-completed")
	.addEventListener("change", function (e) {
		filters.hideCompleted = e.target.checked;
		renderTasks(tasks, filters);
	});
