import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from "react-router-dom";


function MovieDetails() {

    const history = useHistory();
    const dispatch = useDispatch();
    const movieDetails = useSelector(store => store.movieDetails);
    const movieGenres = useSelector(store => store.movieGenres);

    

    return (
        <div data-testid="movieDetails">
            <h1>{movieDetails.title}</h1>
            <img src={movieDetails.poster} alt={movieDetails.title} />
            <p>{movieDetails.description}</p>
            <p>Genres:</p>
            {movieGenres.map(genres => {
                return (
                    <p>{genres.name}</p>
                )
            })}
            <button data-testid="toList" onClick={() => history.push("/")}>Return to all movies</button>
        </div>
        
    )
};

export default MovieDetails;