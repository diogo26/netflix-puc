const popular = async () => {
  const { apiKey, baseUrl, baseUrlImage } = await import("./globalCommons.js");
  const { convertToSlug } = await import("./utils.js");

  function getPopularMovies(numberPage) {
    fetch(
      `${baseUrl}movie/popular?api_key=${apiKey}&language=pt-BR&page=${
        numberPage ? numberPage : 1
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        const movies = data.results;
        let elementDivMovies = document.getElementById("listGridAllMovies");
        movies.forEach((obj) => {
          elementDivMovies.innerHTML += `<div id="${
            obj.id
          }"><a href="movie.html?${convertToSlug(obj.title)}/${
            obj.id
          }"><img src="${baseUrlImage + obj.poster_path}"/> </a></div>`;
        });
      })
      .catch((err) => {
        alert(
          "Um erro inesperado aconteceu! Tente atualizar a sua tela ou acessar mais tarde"
        );
      });
  }
  getPopularMovies();
};
window.onload = function () {
  popular();
};
