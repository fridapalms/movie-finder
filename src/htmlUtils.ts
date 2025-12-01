import { addToWatchlist, removeFromWatchlist } from "./main";
import type { Movie } from "./models/Movie";
import { getMovieById } from "./services/movieService";

//HTML FÖR SEARCH LIST:
export const createHtml = (movies: Movie[]) => {
  const moviesSection = document.getElementById("movies");

  if (moviesSection) {
    moviesSection.innerHTML = ""; //rensar html-listan
  }

  //Om listan är tom, visa text:
  if (!movies || movies.length === 0) {
    const resultsHeadline = document.getElementById("resultsHeadline");

    if (resultsHeadline) {
      resultsHeadline.innerHTML = "";
    }
    const noResult = document.createElement("h3");
    noResult.innerHTML = "No movies found. Try again!";
    noResult.className = "noResult";
    moviesSection?.appendChild(noResult);
    return;
  }

  //Sökresultat headline
  const resultsHeadline = document.getElementById("resultsHeadline");

  if (resultsHeadline) {
    resultsHeadline.innerHTML = "";
  }
  const resultsTitle = document.createElement("h1");
  resultsTitle.className = "resultsTitle";
  resultsTitle.innerHTML = "Search results:";
  resultsHeadline?.appendChild(resultsTitle);

  //loop för söklistan:
  movies.forEach((movie) => {
    //Skapa element:
    const movieContainer = document.createElement("div");
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    const infoContainer = document.createElement("div");
    const title = document.createElement("h2");
    const btnContainer = document.createElement("div");
    const infoButton = document.createElement("button");
    const addButton = document.createElement("button");

    //Ändra element:
    movieContainer.className = "movieContainer";
    imgContainer.className = "imgContainer";
    img.className = "poster";
    img.src = movie.Poster;
    img.alt = movie.Title;
    infoContainer.className = "infoContainer";
    title.className = "movieTitle";
    title.innerHTML = movie.Title;
    btnContainer.className = "btnContainer";
    infoButton.className = "infoButton";
    infoButton.innerHTML = "ABOUT MOVIE";
    addButton.className = "addButton";
    addButton.innerHTML = "+";

    //Lyssna efter klick på addButton:
    addButton?.addEventListener("click", async (e) => {
      e.preventDefault();
      addToWatchlist(movie); //Lägg till på watchlist
    });

    //Lyssna efter klick på infoButton:
    infoButton.addEventListener("click", async () => {
      const modal = document.getElementById("modal") as HTMLDialogElement;

      if (modal) {
        modal.innerHTML = "";
      }

      const movieDetails = await getMovieById(movie.imdbID);
      createHtmlForMovieDetails(movieDetails);

      modal.showModal();
    });

    //Placera element:
    imgContainer.appendChild(img);
    movieContainer.appendChild(imgContainer);
    movieContainer.appendChild(infoContainer);
    infoContainer.appendChild(title);
    infoContainer.appendChild(btnContainer);
    btnContainer.appendChild(infoButton);
    btnContainer.appendChild(addButton);
    moviesSection?.appendChild(movieContainer);
  });
};

//HTML FÖR WATCHLIST:
export const createWatchlist = (watchlist: Movie[]) => {
  const watchlistSection = document.getElementById("watchlistSection");

  if (watchlistSection) {
    watchlistSection.innerHTML = ""; //Rensar listan
  }

  if (watchlist.length === 0) {
    //Om listan är tom, visa text:
    const noWatchlist = document.createElement("h3");
    noWatchlist.innerHTML = "Your watchlist is empty.";
    noWatchlist.className = "noWatchlist";
    watchlistSection?.appendChild(noWatchlist);
    return;
  }

  //loop för watchlist:
  watchlist.forEach((movie, i) => {
    //Skapa element:
    const movieContainer = document.createElement("div");
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    const infoContainer = document.createElement("div");
    const title = document.createElement("h2");
    const btnContainer = document.createElement("div");
    const infoButton = document.createElement("button");
    const removeButton = document.createElement("button");

    //Ändra element:
    movieContainer.className = "movieContainer";
    imgContainer.className = "imgContainer";
    img.className = "poster";
    img.src = movie.Poster;
    img.alt = movie.Title;
    infoContainer.className = "infoContainer";
    title.className = "movieTitle";
    title.innerHTML = movie.Title;
    btnContainer.className = "btnContainer";
    infoButton.className = "infoButton";
    infoButton.innerHTML = "ABOUT MOVIE";
    removeButton.className = "removeButton";
    removeButton.innerHTML = "✕";

    //Lyssna efter klick på ta bort-knappen:
    removeButton?.addEventListener("click", async (e) => {
      e.preventDefault();
      removeFromWatchlist(i);
    });

    //Lyssna efter klick på infoButton:
    infoButton.addEventListener("click", async () => {
      const modal = document.getElementById("modal") as HTMLDialogElement;

      if (modal) {
        modal.innerHTML = "";
      }

      const movieDetails = await getMovieById(movie.imdbID);
      createHtmlForMovieDetails(movieDetails);

      modal.showModal();
    });

    //Placera element:
    imgContainer.appendChild(img);
    movieContainer.appendChild(imgContainer);
    movieContainer.appendChild(infoContainer);
    infoContainer.appendChild(title);
    infoContainer.appendChild(btnContainer);
    btnContainer.appendChild(infoButton);
    btnContainer.appendChild(removeButton);
    watchlistSection?.appendChild(movieContainer);
  });
};

export const createHtmlForMovieDetails = (movie: Movie) => {
  const modal = document.getElementById("modal") as HTMLDialogElement;
  const modalImg = document.createElement("div");
  const modalPoster = document.createElement("img");
  const modalInfo = document.createElement("div");
  const modalTitle = document.createElement("h2");
  const modalPlot = document.createElement("p");
  const actors = document.createElement("p");
  const director = document.createElement("p");
  const closeButton = document.createElement("button");

  modalImg.className = "modalImg";
  modalPoster.className = "modalPoster";
  modalPoster.src = movie.Poster;
  modalInfo.className = "modalInfo";
  modalTitle.className = "modalTitle";
  modalTitle.innerHTML = movie.Title;
  modalPlot.className = "modalPlot";
  modalPlot.innerHTML = movie.Plot;
  actors.className = "actors";
  actors.innerHTML = "Actors: " + movie.Actors;
  director.className = "director";
  director.innerHTML = "Directed by: " + movie.Director;
  closeButton.className = "closeButton";
  closeButton.innerHTML = "CLOSE WINDOW";

  //Lyssna efter klick på closeButton:
  closeButton.addEventListener("click", async () => {
    const modal = document.getElementById("modal") as HTMLDialogElement;
    modal.close();
  });

  modalImg.appendChild(modalPoster);
  modalInfo.appendChild(modalTitle);
  modalInfo.appendChild(modalPlot);
  modalInfo.appendChild(actors);
  modalInfo.appendChild(director);
  modalInfo.appendChild(closeButton);
  modal.appendChild(modalImg);
  modal.appendChild(modalInfo);
};
