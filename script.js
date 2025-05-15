function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    if (taskText === "") return;  // Prevent blank submissions
  
    const li = document.createElement("li");
    li.textContent = taskText;
    li.onclick = () => li.classList.toggle("completed");
    document.getElementById("taskList").appendChild(li);
    input.value = "";
  
    saveTasks(); // Save updated list
  }
  
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
      tasks.push({
        text: li.textContent,
        completed: li.classList.contains("completed")
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function loadTasks() {
    const saved = localStorage.getItem("tasks");
    if (!saved) return;
  
    const tasks = JSON.parse(saved);
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task.text;
      if (task.completed) li.classList.add("completed");
      li.onclick = () => {
        li.classList.toggle("completed");
        saveTasks(); // Update when toggled
      };
      document.getElementById("taskList").appendChild(li);
    });
  }
  
  window.onload = loadTasks;
  