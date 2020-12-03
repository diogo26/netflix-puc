const movie = async () => {
  const { apiKey, baseUrl, baseUrlImage } = await import(
    "../script/globalCommons.js"
  );
  const { generateGlider } = await import("./generateGlider.js");
  const { convertToSlug } = await import("./utils.js");

  function getDetailsMovie() {
    const idMovieUrl = window.location.search.split("/")[1];
    fetch(`${baseUrl}movie/${idMovieUrl}?api_key=${apiKey}&language=pt-BR`)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("titleHighlightmovie").innerHTML = data.title;
        const El_highlight = document.querySelector("#highlight");
        El_highlight.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0.5)100%),url('${
          baseUrlImage + data.backdrop_path
        }')`;
        document.getElementsByClassName("highlight_summaryMovie")[0].innerHTML =
          data.overview;
        document.getElementById("popularity").innerHTML = data.popularity;
        document.getElementById("vote_average").innerHTML = data.vote_average;
        document.getElementById("vote_count").innerHTML = data.vote_count;
        document.getElementById(
          "release_date"
        ).innerHTML = data.release_date.split("-").reverse().join("/");
        let genres = data.genres.map((genre) => {
          return genre.name;
        });
        document.getElementById("genres").innerHTML = genres.join();
        getSimilarMovies(idMovieUrl);
      })
      .catch((err) => {
        alert("Nenhum filme encontrado, por favor selecione outro");
        window.location.href = "index.html";
        console.warn(err);
      });
  }

  function getSimilarMovies(idMovie) {
    fetch(`${baseUrl}movie/${idMovie}/similar?api_key=${apiKey}&language=pt-BR`)
      .then((response) => response.json())
      .then((data) => {
        const movies = data.results;
        let elementDivMovies = document.getElementById("simularMovies");
        movies.forEach((obj) => {
          elementDivMovies.innerHTML += `<div id="${
            obj.id
          }" class="item" ><a href="movie.html?${convertToSlug(obj.title)}/${
            obj.id
          }"><img src="${baseUrlImage + obj.poster_path}"/> </a></div>`;
        });

        if (data.results.length > 0) {
          generateGlider("simularMovies");
        } else {
          document.getElementById("listFilms").style.display = "none";
        }
      })
      .catch((err) => {
        alert(
          "Um erro inesperado aconteceu! Tente atualizar a sua tela ou acessar mais tarde"
        );
      });
  }

  getDetailsMovie();
};
window.onload = function () {
  movie();
};
