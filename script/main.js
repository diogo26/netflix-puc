const main = async () => {
  const { apiKey, baseUrl, baseUrlImage } = await import(
    "../script/globalCommons.js"
  );

  const { generateGlider } = await import("./generateGlider.js");
  const { convertToSlug } = await import("./utils.js");

  function getHighlightMovie(typeRequest) {
    fetch(`${baseUrl}${typeRequest}?api_key=${apiKey}&language=pt-BR`)
      .then((response) => response.json())
      .then((data) => {
        const positionRandom = Math.floor(Math.random() * data.results.length);
        document.getElementById("titleHighlightmovie").innerHTML =
          data.results[positionRandom].title;
        const El_highlight = document.querySelector("#highlight");
        El_highlight.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0.5)100%),url('${
          baseUrlImage + data.results[positionRandom].backdrop_path
        }')`;
        document.getElementsByClassName("highlight_summaryMovie")[0].innerHTML =
          data.results[positionRandom].overview;

        document.getElementById(
          "viewDetails"
        ).href = `movie.html?${convertToSlug(
          data.results[positionRandom].title
        )}/${data.results[positionRandom].id}`;
      })
      .catch((err) => {
        // alert(
        //   "Um erro inesperado aconteceu! Tente atualizar a sua tela ou acessar mais tarde"
        // );
      });
  }

  function getListMovies(typeRequest, idElement) {
    fetch(`${baseUrl}${typeRequest}?api_key=${apiKey}&language=pt-BR`)
      .then((response) => response.json())
      .then((data) => {
        const movies = data.results;
        let elementDivMovies = document.getElementById(idElement);
        movies.forEach((obj) => {
          elementDivMovies.innerHTML += `<div id="${
            obj.id
          }" class="item" ><a href="movie.html?${convertToSlug(obj.title)}/${
            obj.id
          }"><img src="${baseUrlImage + obj.poster_path}"/> </a></div>`;
        });
        generateGlider(idElement);
      })
      .catch((err) => {
        // alert(
        //   "Um erro inesperado aconteceu! Tente atualizar a sua tela ou acessar mais tarde"
        // );
      });
  }

  getHighlightMovie("movie/top_rated");
  getListMovies("movie/popular", "listPopularMovie");
  getListMovies("movie/now_playing", "listFilmesCine");
};

window.onload = function () {
  main();
};
