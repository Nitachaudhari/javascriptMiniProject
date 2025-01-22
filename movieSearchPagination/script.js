const apiKey = '9b59ea9f';
const apiUrl = 'http://www.omdbapi.com/';
let currentPage = 1;
let searchTerm = '';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const pageNumber = document.getElementById('page-number');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  searchTerm = input.value.trim();
  currentPage = 1;
  if (searchTerm) {
    await fetchMovies();
  } else {
    showError("Please enter a movie title.");
  }
});

async function fetchMovies() {
  try {
    showLoading(true);
    togglePaginationButtons(false);
    
    const response = await fetch(`${apiUrl}?s=${encodeURIComponent(searchTerm)}&page=${currentPage}&apikey=${apiKey}`);
    const data = await response.json();
    
    showLoading(false);
    togglePaginationButtons(true);

    if (data.Response === "True") {
      displayResults(data.Search);
      updatePagination(data.totalResults);
    } else {
      showError(data.Error || "No results found.");
    }
  } catch (error) {
    showLoading(false);
    togglePaginationButtons(true);
    showError("An error occurred. Please try again later.");
  }
}

function displayResults(movies) {
  resultsContainer.innerHTML = movies.map(movie => `
    <div class="movie">
      <h2>${movie.Title}</h2>
      <p>Year: ${movie.Year}</p>
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title} poster">
    </div>
  `).join('');
}

function updatePagination(totalResults) {
  const totalPages = Math.ceil(totalResults / 10);
  prevButton.disabled = currentPage <= 1;
  nextButton.disabled = currentPage >= totalPages;
  pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;
}

function showLoading(isLoading) {
  resultsContainer.innerHTML = isLoading ? `<p>Loading...</p>` : '';
}

function togglePaginationButtons(isEnabled) {
  prevButton.disabled = !isEnabled || currentPage <= 1;
  nextButton.disabled = !isEnabled;
}

prevButton.addEventListener('click', async () => {
  if (currentPage > 1) {
    currentPage--;
    await fetchMovies();
  }
});

nextButton.addEventListener('click', async () => {
  currentPage++;
  await fetchMovies();
});

function showError(message) {
  resultsContainer.innerHTML = `<p class="error">${message}</p>`;
}
