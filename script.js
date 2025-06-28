fetch('movies.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('movies');
    data.forEach(movie => {
      container.innerHTML += `
        <div class="bg-gray-800 rounded-xl overflow-hidden shadow-md">
          <img src="${movie.thumbnail}" alt="${movie.title}" class="w-full h-40 object-cover">
          <div class="p-2">
            <h2 class="text-lg font-semibold">${movie.title}</h2>
            <p class="text-sm text-gray-300">${movie.description.slice(0, 50)}...</p>
            <div class="flex gap-2 mt-1">
              ${movie.tags.map(tag => `<span class="text-xs bg-red-600 rounded-full px-2">${tag}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
    });
  });
