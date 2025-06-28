let allMovies = [];

fetch('movies.json')
  .then(res => res.json())
  .then(data => {
    allMovies = data;
    renderFeaturedBanner();
    renderCategoryRows();
  });

// Featured banner
function renderFeaturedBanner() {
  const banner = document.getElementById("featuredBanner");
  const movie = allMovies[Math.floor(Math.random() * allMovies.length)];

  banner.innerHTML = `
    <div class="absolute inset-0">
      <img src="${movie.thumbnail}" class="w-full h-full object-cover brightness-[.4]">
    </div>
    <div class="absolute bottom-5 left-5 text-white">
      <h2 class="text-2xl font-bold">${movie.title}</h2>
      <p class="text-sm text-gray-200 w-2/3">${movie.description.slice(0, 100)}...</p>
      <a href="movie.html?id=${movie.id}" class="inline-block mt-3 bg-red-500 px-4 py-2 rounded font-semibold shadow">
        🎬 Watch Now
      </a>
    </div>
  `;
}

// Group by genre
function renderCategoryRows() {
  const container = document.getElementById("categorySections");
  const tags = getUniqueTags(allMovies);

  tags.forEach(tag => {
    const movies = allMovies.filter(m => m.tags.includes(tag));
    if (movies.length === 0) return;

    const section = document.createElement("div");
    section.innerHTML = `
      <h2 class="text-xl font-bold text-red-400 mb-2">${tag}</h2>
      <div class="flex gap-4 overflow-x-auto pb-1">
        ${movies.map(m => `
          <a href="movie.html?id=${m.id}" class="min-w-[160px] bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 transition">
            <img src="${m.thumbnail}" class="w-full h-32 object-cover">
            <div class="p-2">
              <h3 class="text-sm font-semibold">${m.title}</h3>
            </div>
          </a>
        `).join('')}
      </div>
    `;
    container.appendChild(section);
  });
}

// Get all unique tags
function getUniqueTags(data) {
  const all = data.flatMap(m => m.tags);
  return [...new Set(all)];
}

// Search filter
document.getElementById("searchInput").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const results = allMovies.filter(m => m.title.toLowerCase().includes(keyword));

  document.getElementById("categorySections").style.display = keyword ? "none" : "block";
  document.getElementById("searchResults").style.display = keyword ? "grid" : "none";

  const grid = document.getElementById("searchResults");
  const empty = document.getElementById("emptyState");
  grid.innerHTML = '';

  if (results.length === 0 && keyword) {
    empty.classList.remove("hidden");
  } else {
    empty.classList.add("hidden");
    results.forEach(movie => {
      grid.innerHTML += `
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
});
