export function getInitialHTML(initialData) {
  return `
      <h1>Search Result</h1>
      ${initialData.movies
        .map(
          movie => `
          <div class="movie">
            <p>${movie.title}</p>
            <button type="button">click</button>
          </div>
        `
        )
        .join('')}
    `;
}

export async function renderSearch({ searchParams, initialData }) {
  if (!initialData) {
    document.querySelector('#app').innerHTML = `
      <h1>Search Result</h1>
      <p>Searching for ${searchParams.query}...</p>
    `;

    const response = await fetch(
      `${
        import.meta.env.DEV === 'development' ? 'http://localhost:4000' : ''
      }/api/search?query=${searchParams.query}`
    );
    const movies = await response.json();

    document.querySelector('#app').innerHTML = getInitialHTML({ movies });
  }

  Array.from(document.querySelectorAll('.movie button')).forEach(button => {
    button.addEventListener('click', () => {
      console.log('button is click');
    });
  });
}
