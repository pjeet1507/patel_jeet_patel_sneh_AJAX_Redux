(() => {
  // variables
  const characters = document.querySelector("#characters");
  const movieBox = document.querySelector("#movieBox");
  const movieCon = document.querySelector("#movie-con");
  const baseUrl = "https://swapi.dev/api/people/?format=json";

  // functions
  function getcharacters() {
    fetch(`${baseUrl}`)
      .then((response) => response.json())
      .then(function (response) {
        const results = response.results; //  assuming the API response has a 'results' property
        const ul = document.createElement("ul");

        results.forEach((character) => {
          const li = document.createElement("li");
          const a = document.createElement("a");

          a.textContent = character.name; // replace with actual property names
          a.dataset.movies = character.films;

          li.appendChild(a);
          ul.appendChild(li);
        });

        characters.appendChild(ul); // append the list to the characters element
      })
      .then(function () {
        const links = document.querySelectorAll("#characters li a");
        links.forEach((link) => {
          link.addEventListener("click", getMovies);
        });
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
      });
  }

  function getMovies(e) {
    const filmURLs = e.currentTarget.dataset.movies.split(",");

    filmURLs.forEach((filmUrl) => {
      fetch(filmUrl)
        .then((response) => response.json())
        .then((filmDetail) => {
          console.log(filmDetail); // process each film's details here
        })
        .catch((error) => {
          console.error("Error fetching film details:", error);
        });
    });
  }

  getcharacters();
  // eventListener
})();
