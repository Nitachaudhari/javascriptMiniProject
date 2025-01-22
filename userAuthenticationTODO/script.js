let userAuthToken = null;
let userId = null;

// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Get username and password from the form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        // Send POST request for login
        const response = await fetch("https://json-with-auth.onrender.com/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) throw new Error("Login failed");

        const data = await response.json();

        // Store userAuthToken and userId
        userAuthToken = data.localAccessToken;
        userId = data.userId;

        // Save to local storage
        localStorage.setItem("localAccessToken", userAuthToken);
        localStorage.setItem("userId", userId);

        // Display welcome notification
        document.getElementById("notification").textContent =`Hey ${username}, welcome back!`;
        document.getElementById("fetchTodosButton").style.display = "block";

    } catch (error) {
        console.error("Error during login:", error);
    }
});

// Fetch todos and display them
document.getElementById("fetchTodosButton").addEventListener("click", async function() {
    try {
        // Fetch todos with userId
        const response = await fetch(`https://json-with-auth.onrender.com/todos?userId=${userId}`, {
            headers: {
                "Authorization": `Bearer ${userAuthToken}`
            }
        });

        if (!response.ok) throw new Error("Failed to fetch todos");

        const todos = await response.json();

        // Display todos
        const todosContainer = document.getElementById("todos");
        todosContainer.innerHTML = ""; // Clear previous todos

        todos.forEach(todo => {
            const todoItem = document.createElement("div");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.completed;
            checkbox.addEventListener("change", () => toggleTodoCompletion(todo.id, checkbox.checked));

            const label = document.createElement("label");
            label.textContent = todo.title;

            todoItem.appendChild(checkbox);
            todoItem.appendChild(label);
            todosContainer.appendChild(todoItem);
        });
    } catch (error) {
        console.error("Error fetching todos:", error);
    }
});

// Toggle completion status of todo items
async function toggleTodoCompletion(todoId, isCompleted) {
    try {
        // Send PATCH request to update todo completion
        const response = await fetch(`https://json-with-auth.onrender.com/todos/${todoId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userAuthToken}`
            },
            body: JSON.stringify({ completed: isCompleted })
        });

        if (!response.ok) throw new Error("Failed to update todo");
        console.log(`Todo ${todoId} updated successfully`);

    } catch (error) {
        console.error("Error updating todo:", error);
    }
}