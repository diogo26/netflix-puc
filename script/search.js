const baseUrl = "https://api.themoviedb.org/3/";
const apiKey = "d97cd5d395ff74c6d762e2fb631661ff";
const baseUrlImage = "https://image.tmdb.org/t/p/w220_and_h330_face/";

function searchMovie(val) {
  if (val) {
    if (val.keyCode == 13) {
      window.location.href = `search.html?movie=${convertToSlug(
        val.target.value
      )}`;
      actionSeacrh(val.target.value);
    }
  }
}

function actionSeacrh(val) {
  if (val) localStorage.setItem("paramSearch", val);
  const idMovieUrl = window.location.search.split("=")[1];
  fetch(
    `${baseUrl}search/movie?api_key=${apiKey}&language=pt-BR&query=${
      val ? val : idMovieUrl
    }&page=1`
  )
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("search").value = localStorage.getItem(
        "paramSearch"
      );
      localStorage.setItem("movieSearch", JSON.stringify(data.results));
      const movies = data.results;
      if (movies) {
        let elementDivMovies = document.getElementById("listGridAllMovies");
        movies.forEach((obj) => {
          elementDivMovies.innerHTML += `<div id="${
            obj.id
          }"><a href="movie.html?${convertToSlug(obj.title)}/${
            obj.id
          }"><img src="${baseUrlImage + obj.poster_path}"/> </a></div>`;
        });
      }
    })
    .catch((err) => {
      console.warn(err);
    });
}

const convertToSlug = (text) => {
  const a = "àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;";
  const b = "aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------";
  const p = new RegExp(a.split("").join("|"), "g");
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, "-and-")
    .replace(/[\s\W-]+/g, "-");
};
window.onload = function () {
  searchMovie();
  actionSeacrh();
};
