let allMovies = [];
let currentGenre = "All";

// Load movies
fetch('movies.json')
  .then(res => res.json())
  .then(data => {
    allMovies = data;
    const allGenres = getUniqueGenres(data);
    renderGenreFilters(allGenres);
    renderMovies(data);
  });

// Extract unique genres
function getUniqueGenres(data) {
  const tags = data.flatMap(m => m.tags);
  const unique = [...new Set(tags)];
  return ["All", ...unique];
}

// Render genre tabs
function renderGenreFilters(genres) {
  const container = document.getElementById("genreFilters");
  container.innerHTML = "";
  genres.forEach(genre => {
    const btn = document.createElement("button");
    btn.textContent = genre;
    btn.className = `px-3 py-1 rounded-full border border-gray-700 hover:bg-red-600 transition ${
      genre === currentGenre ? "bg-red-500 text-white font-bold" : "text-gray-300"
    }`;
    btn.addEventListener("click", () => {
      currentGenre = genre;
      document.getElementById("searchInput").value = "";
      renderGenreFilters(genres);
      const filtered = genre === "All" ? allMovies : allMovies.filter(m => m.tags.includes(genre));
      renderMovies(filtered);
    });
    container.appendChild(btn);
  });
}

// Render cards
function renderMovies(movies) {
  const container = document.getElementById("movieGrid");
  container.innerHTML = '';
  movies.forEach(movie => {
    container.innerHTML += `
      <a href="movie.html?id=${movie.id}" class="block bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">
        <img src="${movie.thumbnail}" class="w-full h-40 object-cover">
        <div class="p-3">
          <h2 class="text-lg font-semibold">${movie.title}</h2>
          <p class="text-sm text-gray-300">${movie.description.slice(0, 50)}...</p>
          <div class="flex flex-wrap gap-1 mt-2">
            ${movie.tags.map(tag => `<span class="text-xs bg-red-600 px-2 py-0.5 rounded-full">${tag}</span>`).join('')}
          </div>
        </div>
      </a>
    `;
  });
}

// Search logic
document.getElementById("searchInput").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = allMovies.filter(m => m.title.toLowerCase().includes(keyword));
  renderMovies(filtered);
  currentGenre = "All"; // Reset genre on search
  renderGenreFilters(getUniqueGenres(allMovies));
});
