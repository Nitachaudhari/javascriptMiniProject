const API_KEY = '9b59ea9f';
let currentPage = 1;
let totalPages = 0;

function fetchMovies(query, page = 1) {
    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&page=${page}&apikey=${API_KEY}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.Response === 'True') {
                totalPages = Math.ceil(data.totalResults / 10);
                displayMovies(data.Search);
                updatePagination();
            } else {
                displayError(data.Error);
            }
        })
        .catch(error => {
            displayError("Something went wrong: " + error.message);
        });
}

function displayMovies(movies) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (!movies || movies.length === 0) {
        displayError('No movies found.');
        return;
    }

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;
        resultsDiv.appendChild(movieCard);
    });
}

function updatePagination() {
    const paginationInfo = document.getElementById('page-info');
    paginationInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    paginationInfo.style.display = totalPages > 1 ? 'block' : 'none';

    document.getElementById('prev-button').disabled = currentPage === 1;
    document.getElementById('next-button').disabled = currentPage === totalPages;
}

function displayError(message) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p id="error">${message}</p>`;
}

function getQuery() {
    return document.getElementById('search-input').value;
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-button').addEventListener('click', () => {
        currentPage = 1;
        fetchMovies(getQuery());
    });

    document.getElementById('next-button').addEventListener('click', () => {
        currentPage++;
        fetchMovies(getQuery(), currentPage);
    });

    document.getElementById('prev-button').addEventListener('click', () => {
        currentPage--;
        fetchMovies(getQuery(), currentPage);
    });
});
