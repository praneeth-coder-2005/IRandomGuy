let allMovies = [];
let currentGenre = "All";

// Load movies
fetch('movies.json')
  .then(res => res.json())
  .then(data => {
    allMovies = data;
    const genres = getUniqueGenres(data);
    renderGenreFilters(genres);
    renderMovies(data);
    renderContinueWatching();
  });

// Unique genres
function getUniqueGenres(data) {
  const tags = data.flatMap(m => m.tags);
  return ["All", ...new Set(tags)];
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

// Render grid
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

// Search input
document.getElementById("searchInput").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = allMovies.filter(m => m.title.toLowerCase().includes(keyword));
  renderMovies(filtered);
  currentGenre = "All";
  renderGenreFilters(getUniqueGenres(allMovies));
});

// Continue Watching
function renderContinueWatching() {
  const recentIds = JSON.parse(localStorage.getItem("recentMovies") || "[]");
  if (recentIds.length === 0) return;

  const recentSection = document.getElementById("recentSection");
  const recentDiv = document.getElementById("recentMovies");

  const recentMovies = recentIds
    .map(id => allMovies.find(m => m.id === id))
    .filter(Boolean);

  if (recentMovies.length) {
    recentSection.classList.remove("hidden");
    recentMovies.forEach(movie => {
      recentDiv.innerHTML += `
        <a href="movie.html?id=${movie.id}" class="min-w-[150px] bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 transition">
          <img src="${movie.thumbnail}" class="w-full h-28 object-cover">
          <div class="p-2">
            <h2 class="text-sm font-bold">${movie.title}</h2>
          </div>
        </a>
      `;
    });
  }
}
