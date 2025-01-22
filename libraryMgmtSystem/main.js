const databaseURL = "https://library-management-acda4-default-rtdb.firebaseio.com/";

// Add Book
async function addBook(book) {
    try {
        const response = await fetch(`${databaseURL}/books.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        });
        const data = await response.json();
        console.log("Book added:", data);
        readBooks();
    } catch (error) {
        console.error("Error adding book:", error);
    }
}

// Read Books
async function readBooks() {
    try {
        const response = await fetch(`${databaseURL}/books.json`);
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error("Error reading books:", error);
    }
}

// Update Book
async function updateBook(id, updatedData) {
    try {
        await fetch(`${databaseURL}/books/${id}.json`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        });
        console.log("Book updated:", updatedData);
        readBooks();
    } catch (error) {
        console.error("Error updating book:", error);
    }
}

// Delete Book
async function deleteBook(id) {
    try {
        await fetch(`${databaseURL}/books/${id}.json`, {
            method: "DELETE"
        });
        console.log("Book deleted:", id);
        readBooks();
    } catch (error) {
        console.error("Error deleting book:", error);
    }
}

// Display Books
function displayBooks(books) {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";
    for (const id in books) {
        const book = books[id];
        bookList.innerHTML += `
            <div>
                <h3>${book.title}</h3>
                <p>by ${book.author} (${book.publishedYear})</p>
                <button onclick="deleteBook('${id}')">Delete</button>
                <button onclick="updateBook('${id}', { available: !${book.available} })">
                    Mark as ${book.available ? "Unavailable" : "Available"}
                </button>
            </div>
        `;
    }
}

// Handle form submission to add a new book
document.getElementById("bookForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const book = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        genre: document.getElementById("genre").value,
        publishedYear: parseInt(document.getElementById("publishedYear").value),
        available: true
    };
    addBook(book);
});

// Filter books by genre
async function filterBooksByGenre(genre) {
    const response = await fetch(`${databaseURL}/books.json`);
    const books = await response.json();
    const filteredBooks = Object.entries(books).filter(([id, book]) => book.genre === genre);
    displayBooks(Object.fromEntries(filteredBooks));
}

// Sort books by published year
async function sortBooksByYear() {
    const response = await fetch(`${databaseURL}/books.json`);
    const books = await response.json();
    const sortedBooks = Object.entries(books).sort((a, b) => a[1].publishedYear - b[1].publishedYear);
    displayBooks(Object.fromEntries(sortedBooks));
}