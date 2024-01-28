(() => {
  // variables
  const characters = document.querySelector("#characters");
  const movieBox = document.querySelector("#movieBox");
  const movieCon = document.querySelector("#movie-con");
  const movieTemplate = document.querySelector("#movieTemplate"); // Add this line
  const baseUrl = "https://swapi.dev/api/people/?format=json";

  // functions
  function getcharacters() {
    fetch(`${baseUrl}`)
      .then((response) => response.json())
      .then(function (response) {
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

      // hightlight thing
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
      // ----------------
      .catch((error) => {
        console.error("something went wrong when getting character:", error);
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

          gsap.from(movieElement, {
            duration: 0.7,
            y: -100,
            opacity: 0,
            stagger: 0.1,
          });
        })
        .catch((error) => {
          console.error(
            "something went wrong when getting film details:",
            error
          );
        });
    });
  }

  function createMovieElement(movie) {
    // Clone the template content using a new variable
    const clonedTemplate = document.importNode(movieTemplate.content, true);

    // Find and populate elements within the cloned template
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
  // eventListener
})();
