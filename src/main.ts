import "./style.scss";
import { createHtml, createWatchlist } from "./htmlUtils";
import type { Movie } from "./models/Movie";
import { getMovies } from "./services/movieService";
import "./style.scss";

//SEARCH FUNCTION:
document.getElementById("searchForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const theInput = document.getElementById("searchText");
  let searchText = "";

  if (theInput) {
    searchText = (theInput as HTMLInputElement).value;
  }

  const result = await getMovies(searchText);

  if (result.Response === "False" || !result.Search) {
    createHtml([]); // Skicka tom lista → visar "No movies found"
    return;
  }

  createHtml(result.Search);

  if (theInput) {
    (theInput as HTMLInputElement).value = "";
  }
});

//ADD TO WATCHLIST:

let watchlist: Movie[] = JSON.parse(localStorage.getItem("watchlist") || "[]");

export const addToWatchlist = (movie: Movie) => {
  watchlist.push(movie);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  createWatchlist(watchlist);
};

createWatchlist(watchlist);

//WATCHLIST REMOVE:

export const removeFromWatchlist = (i: number) => {
  watchlist.splice(i, 1);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  createWatchlist(watchlist);
};

createWatchlist(watchlist);
