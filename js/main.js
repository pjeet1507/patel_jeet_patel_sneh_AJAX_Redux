(() => {
  console.log("IIFE Fired");

  // variables
  const charactors = document.querySelector("#charactors");
  const movieBox = document.querySelector("#movieBox");
  const movieCon = document.querySelector("#movie-con");
  const baseUrl = "https://swapi.dev/api/people/?format=json";

  // functions
  function getcharactors() {
    fetch(`${baseUrl}`)
      .then((response) => response.json())
      .then(function (response) {
        const results = response.results; //  assuming the API response has a 'results' property
        const ul = document.createElement("ul");

        results.forEach((charactor) => {
          const li = document.createElement("li");
          const a = document.createElement("a");

          a.textContent = charactor.name; // replace with actual property names
          a.dataset.movies = charactor.films;

          li.appendChild(a);
          ul.appendChild(li);
        });

        charactors.appendChild(ul); // append the list to the charactors element
      })
      .then(function () {
        const links = document.querySelectorAll("#charactors li a");
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

  getcharactors();
  // eventListener
})();
