const databaseURL = "https://login-4a8b6-default-rtdb.firebaseio.com";

// Authenticate the user by checking the Firebase database
async function authenticateUser(username, password) {
    try {
        // Fetch all users from the database
        const response = await fetch(`${databaseURL}/users.json`);
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }

        const users = await response.json();
        console.log("Fetched users:", users); // Debug log to inspect the structure of `users`

        // Check if users exist and is an object
        if (!users || typeof users !== "object") {
            document.getElementById("message").textContent = "No user data found.";
            return;
        }

        // Check if a user exists with the provided username and password
        const user = Object.values(users).find(user => user?.username === username && user?.password === password);

        if (user) {
            document.getElementById("message").textContent = "Login successful!";
            // Redirect to dashboard or other actions can be performed here
        } else {
            document.getElementById("message").textContent = "Invalid credentials. Please try again.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("message").textContent = "Error accessing database.";
    }
}

// Handle form submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Call authenticateUser with form data
    authenticateUser(username, password);
});
