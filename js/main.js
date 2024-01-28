(() => {
  const characters = document.querySelector("#characters");
  const movieBox = document.querySelector("#movieBox");
  const movieCon = document.querySelector("#movie-con");
  const movieTemplate = document.querySelector("#movieTemplate");
  const baseUrl = "https://swapi.dev/api/people/?format=json";

  function getcharacters() {
    const loadingIndicator = document.querySelector(
      "#characters .loading-indicator"
    );
    loadingIndicator.style.display = "block"; //loading

    fetch(`${baseUrl}`)
      .then((response) => response.json())
      .then(function (response) {
        loadingIndicator.style.display = "none"; //loading
        const results = response.results;
        const ul = document.createElement("ul");

        results.forEach((character) => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          const img = document.createElement("img");

          a.textContent = character.name;
          a.dataset.movies = character.films;

          img.src = `images/${character.name}.jpg`;
          img.alt = character.name;
          img.className = "character-image";
          a.appendChild(img);
          li.appendChild(a);
          ul.appendChild(li);
        });

        characters.appendChild(ul);
        gsap.from("#characters ul li", {
          duration: 0.2,
          y: -50,
          opacity: 0,
          stagger: 0.1,
        });
      })

      .then(function () {
        const links = document.querySelectorAll("#characters li a");
        links.forEach((link) => {
          link.addEventListener("click", function (e) {
            links.forEach((l) => l.classList.remove("selected"));
            e.currentTarget.classList.add("selected");
            getMovies(e);
          });
        });
      })

      .catch((error) => {
        console.error("something went wrong when getting character:", error);
        loadingIndicator.style.display = "none"; // loading
      });
  }

  function getMovies(e) {
    const loadingIndicator = document.querySelector(
      "#movieBox .loading-indicator"
    );
    loadingIndicator.style.display = "block"; //loading

    const filmURLs = e.currentTarget.dataset.movies.split(",");
    movieCon.innerHTML = "";

    filmURLs.forEach((filmUrl) => {
      fetch(filmUrl)
        .then((response) => response.json())
        .then((filmDetail) => {
          if (filmUrl === filmURLs[filmURLs.length - 1]) {
            loadingIndicator.style.display = "none"; // loading
          }
          const movieElement = createMovieElement(filmDetail);
          movieCon.appendChild(movieElement);
        })
        .catch((error) => {
          console.error(
            "something went wrong when getting film details:",
            error
          );
          loadingIndicator.style.display = "none"; //loading
        });
    });
  }

  function createMovieElement(movie) {
    const clonedTemplate = document.importNode(movieTemplate.content, true);

    const movieTitle = clonedTemplate.querySelector(".movie-heading");
    movieTitle.textContent = movie["title"];

    const movieImage = clonedTemplate.querySelector(".poster-image");
    movieImage.src = `images/${movie["episode_id"]}.jpeg`;
    movieImage.alt = movie.title;

    const movieDescription = clonedTemplate.querySelector(".movie-description");
    movieDescription.innerHTML = movie["opening_crawl"];

    return clonedTemplate;
  }

  getcharacters();
})();
