import React from "react";
import "./Details.css";
import Search from "./Search";

function Details({ selected, closeDetail }) {
  if (!selected) return null;

  const imdbUrl = selected.imdb_id
    ? `https://www.imdb.com/title/${selected.imdb_id}`
    : "#";

  const sanitizedTitle = selected.title
    ? selected.title.replace(/[^\w\s]/gi, "").replace(/\s+/g, "_")
    : "movie";

  const filePath = `/downloads/${sanitizedTitle}.mp4`;

  console.log(filePath); 

  return (
    <div className="detail-modal">
      <div className="detail-content">
        <button className="close" onClick={closeDetail}>
          &times;
        </button>
        <h2>{selected.title || "No Title Available"}</h2>
        <p>
          <strong>Year:</strong>{" "}
          {selected.release_date
            ? selected.release_date.split("-")[0]
            : "Unknown"}
        </p>
        <p>
          <strong>Rating:</strong>{" "}
          {selected.vote_average ? `${selected.vote_average}/10` : "Not Rated"}
        </p>
        <div className="detail-body">
          <img
            src={
              selected.poster_path
                ? `https://image.tmdb.org/t/p/w500/${selected.poster_path}`
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={selected.title || "No Title"}
            onError={(e) =>
              (e.target.src = "https://via.placeholder.com/300x450?text=No+Image")
            }
          />
          <p>{selected.overview || "No description available."}</p>
        </div>
        <a
          href={imdbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="imdb-button"
        >
          View on IMDb
        </a>
        {selected.title ? (
          <a
            href={filePath}
            className="download-button"
            download
          >
            Download
          </a>
        ) : (
          <p>No movie selected for download.</p>
        )}
      </div>
    </div>
  );
}

export default Details;
