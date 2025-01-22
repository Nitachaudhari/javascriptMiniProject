let playlist = JSON.parse(localStorage.getItem('playlist')) || [];

// Add song to the playlist
document.getElementById('add-song-btn').addEventListener('click', () => {
    const title = document.getElementById('song-title').value;
    const artist = document.getElementById('artist').value;
    const duration = document.getElementById('duration').value;
    const genre = document.getElementById('genre').value;

    if (title && artist && duration && genre) {
        playlist.push({ title, artist, duration, genre });
        localStorage.setItem('playlist', JSON.stringify(playlist));
        displayPlaylist();
        clearForm();
    } else {
        alert("Please fill all fields!");
    }
});

// Display the playlist
function displayPlaylist() {
    const playlistBody = document.getElementById('playlist-body');
    playlistBody.innerHTML = '';

    playlist.forEach((song, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${song.title}</td>
            <td>${song.artist}</td>
            <td>${song.duration}</td>
            <td>${song.genre}</td>
            <td>
                <button onclick="editSong(${index})">Edit</button>
                <button onclick="deleteSong(${index})">Delete</button>
            </td>
        `;
        playlistBody.appendChild(row);
        console.log(row);
    });
}

// Clear form fields
function clearForm() {
    document.getElementById('song-title').value = '';
    document.getElementById('artist').value = '';
    document.getElementById('duration').value = '';
    document.getElementById('genre').value = 'Pop';
}

// Edit song
function editSong(index) {
    const song = playlist[index];
    document.getElementById('song-title').value = song.title;
    document.getElementById('artist').value = song.artist;
    document.getElementById('duration').value = song.duration;
    document.getElementById('genre').value = song.genre;

    playlist.splice(index, 1); // Remove the current song to update it
}

// Delete song
function deleteSong(index) {
    playlist.splice(index, 1);
    localStorage.setItem('playlist', JSON.stringify(playlist));
    displayPlaylist();
}

// Search functionality
document.getElementById('search-btn').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const filteredPlaylist = playlist.filter(song =>
        song.title.toLowerCase().includes(searchTerm) || song.artist.toLowerCase().includes(searchTerm)
    );
    displayFilteredPlaylist(filteredPlaylist);
});

function displayFilteredPlaylist(filtered) {
    const playlistBody = document.getElementById('playlist-body');
    playlistBody.innerHTML = '';

    filtered.forEach((song, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${song.title}</td>
            <td>${song.artist}</td>
            <td>${song.duration}</td>
            <td>${song.genre}</td>
            <td>
                <button onclick="editSong(${index})">Edit</button>
                <button onclick="deleteSong(${index})">Delete</button>
            </td>
        `;
        playlistBody.appendChild(row);
    });
}

// Sort functionality
document.getElementById('sort-btn').addEventListener('click', () => {
    const sortOption = document.getElementById('sort-options').value;
    playlist.sort((a, b) => a[sortOption].localeCompare(b[sortOption]));
    displayPlaylist();
});

// Load playlist from localStorage on page load
window.onload = displayPlaylist;