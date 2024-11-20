import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Detail from "./Details";

const API_KEY = "10efd2a13d753ff4ae617d8bea5735d1";
const BASE_URL = "https://api.themoviedb.org/3";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async (page = 1) => {
    try {
      const endpoint = searchQuery
        ? `${BASE_URL}/search/movie`
        : `${BASE_URL}/movie/popular`;

      const response = await axios.get(endpoint, {
        params: {
          api_key: API_KEY,
          query: searchQuery,
          page,
        },
      });

      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchMovies(1);
  };

  const handlePageChange = (direction) => {
    const newPage = direction === "next" ? currentPage + 1 : currentPage - 1;
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchMovies(newPage);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); // 
  };

  const closeDetail = () => {
    setSelectedMovie(null); // 
  };

  return (
    <div className="App">
      <h1 className="app-title">FILMS AT YOUR SERVICE 2.0</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search for a Movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="movies-container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              className="movie-card"
              key={movie.id}
              onClick={() => handleMovieClick(movie)}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={movie.title}
                className="movie-poster"
              />
              <h2 className="movie-title">{movie.title}</h2>
              <p className="movie-overview">
                {movie.overview
                  ? movie.overview.substring(0, 100) + "..."
                  : "No description available."}
              </p>
            </div>
          ))
        ) : (
          <p className="no-movies">No movies found. Try searching for something else!</p>
        )}
      </div>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => handlePageChange("previous")}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {selectedMovie && (
        <Detail
          selected={{
            title: selectedMovie.title,
            release_date: selectedMovie.release_date,
            vote_average: selectedMovie.vote_average,
            poster_path: selectedMovie.poster_path,
            overview: selectedMovie.overview,
            imdb_id: selectedMovie.id,
          }}
          closeDetail={closeDetail}
        />
      )}
    </div>
  );
};

export default App;
