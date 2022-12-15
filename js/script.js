var searchInput = document.querySelector(".search");
var cardWrapper = document.querySelector("main");

function noMatch() {
  cardWrapper.innerHTML = `<p class="no-search">No results found.</p>`;
}

function displayMatches(matches) {
  cardWrapper.innerHTML = "";

  if (!matches) {
    noMatch();
  } else {
    for (var matchObj of matches) {
      cardWrapper.insertAdjacentHTML(
        "beforeend",
        `
        <div class="movie-card" style="background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
        url(${matchObj.Poster})">
          <h3>${matchObj.Title}</h3>
          <p>${matchObj.Year}</p>
          <a href="https://www.imdb.com/title/${matchObj.imdbID}/" target="_blank">More Info</a>
        </div>
        `
      );
    }
  }
}

function fetchMovies(event) {
  var keyCode = event.keyCode;
  var searchText = searchInput.value.toLowerCase().trim();

  if (keyCode === 13 && searchText) {
    var responsePromise = fetch(
      `https://www.omdbapi.com/?apikey=96756e0a&s=${searchText}`
    );

    function handleResponse(responseObj) {
      return responseObj.json();
    }

    responsePromise.then(handleResponse).then(function (data) {
      displayMatches(data.Search);

      searchInput.value = "";
    });
  }
}

function init() {
  searchInput.addEventListener("keydown", fetchMovies);
}

init();
