import React, { useEffect, useState } from 'react'
import requests from "./requests";
import instance from "./axios";
import "./Banner.css";

function Banner() {

    const [movie, setMovie] = useState({})

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        const response = await instance.get(requests.fetchNetflixOriginals);
        console.log(response.data.results[
            Math.floor(Math.random() * response.data.results.length - 1)
        ]);
        setMovie(response.data.results[
            Math.floor(Math.random() * response.data.results.length - 1)
        ]);
    }

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (<
        header className="banner"
        style={
            {
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundSize: "cover",
                backgorundPosition: " center center"
            }
        } >


        <div className="banner_contents" >

            <h1 className="banner_title" > {movie.title || movie.name || movie.original_name} </h1>

            <div className="banner_buttons" >

                <button className="banner_button" > Add List </button>
                <button className="banner_button" > Play </button>
            </div>


            <h1 className="banner_description" > {truncate(movie?.overview, 150)} </h1>
        </div>

        <div className="banner_fadeBottom" />

    </header>

    )
}

export default Banner;