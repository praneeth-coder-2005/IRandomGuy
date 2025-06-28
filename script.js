let allMovies = []

// Fetch and render
fetch('movies.json')
  .then(res => res.json())
  .then(data => {
    allMovies = data
    renderMovies(data)
  })

// Render cards
function renderMovies(movies) {
  const container = document.getElementById("movieGrid")
  container.innerHTML = ''
  movies.forEach(movie => {
    container.innerHTML += `
      <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">
        <img src="${movie.thumbnail}" class="w-full h-40 object-cover">
        <div class="p-3">
          <h2 class="text-lg font-semibold">${movie.title}</h2>
          <p class="text-sm text-gray-300">${movie.description.slice(0, 50)}...</p>
          <div class="flex flex-wrap gap-1 mt-2">
            ${movie.tags.map(tag => `<span class="text-xs bg-red-600 px-2 py-0.5 rounded-full">${tag}</span>`).join('')}
          </div>
          <a href="https://t.me/YOUR_BOT?start=${movie.file_id}" class="block mt-3 text-center bg-red-500 py-1 rounded text-sm font-bold">🎬 Watch</a>
        </div>
      </div>
    `
  })
}

// Search
document.getElementById("searchInput").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase()
  const filtered = allMovies.filter(m => m.title.toLowerCase().includes(keyword))
  renderMovies(filtered)
})
