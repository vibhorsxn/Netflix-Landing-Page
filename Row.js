import React, { useState, useEffect } from "react";
import instance from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([]);
    // 
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const requests = await instance.get(fetchUrl);
            console.log(requests.data.results);
            setMovies(requests.data.results);
        }
        fetchData();
    }, [fetchUrl])

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "")
                .then(url => {
                    //https://youtube.com/watch?v=dccsgcscq5a5a
                    const urlParams = new URLSearchParams(new URL(url).search)
                    setTrailerUrl(urlParams.get("v"));

                })

                .catch((error) =>
                    console.log(error));
        }
    }

    return (
        <div className="row" >
            <h2> {title} </h2>
            <div className="row_posters" > {
                movies.map((movie) => (
                    <img onClick={
                        () => handleClick(movie)}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.title}
                        key={movie.id}
                    />
                ))
            }
            </div> { /* trailer URL exist then only opts will work */} {
                trailerUrl && < YouTube videoId={trailerUrl}
                    opts={opts}
                />}
        </div>
    )
}

export default Row;