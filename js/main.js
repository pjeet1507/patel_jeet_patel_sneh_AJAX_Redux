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
          const img = document.createElement("img");

          a.textContent = character.name; // replace with actual property names
          a.dataset.movies = character.films;

          img.src = `images/${character.name}.jpg`; // Example: 'Luke Skywalker' becomes 'lukeskywalker.jpeg'
          img.alt = character.name;
          img.className = "character-image"; // You can define a CSS class for styling
          a.appendChild(img);
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
    movieCon.innerHTML = ""; // Clear existing content

    filmURLs.forEach((filmUrl) => {
      fetch(filmUrl)
        .then((response) => response.json())
        .then((filmDetail) => {
          const movieElement = createMovieElement(filmDetail);
          movieCon.appendChild(movieElement);
        })
        .catch((error) => {
          console.error("Error fetching film details:", error);
        });
    });
  }

  function createMovieElement(movie) {
    const movieElement = document.createElement("div");
    movieElement.className = "movie";

    const movieTitle = document.createElement("h2");
    movieTitle.className = "movie-heading";
    movieTitle.textContent = movie["title"];

    const movieImage = document.createElement("img");
    movieImage.className = "poster-image";
    movieImage.src = `images/${movie["episode_id"]}.jpeg`;
    movieImage.alt = movie["#title"];

    const movieDescription = document.createElement("p");
    movieDescription.className = "movie-description";
    movieDescription.innerHTML = movie["opening_crawl"];

    movieElement.appendChild(movieTitle);
    movieElement.appendChild(movieImage);
    movieElement.appendChild(movieDescription);

    return movieElement;
  }

  getcharacters();
  // eventListener
})();
