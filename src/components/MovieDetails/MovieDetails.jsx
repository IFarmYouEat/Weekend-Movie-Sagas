import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from "react-router-dom";


function MovieDetails() {

    const history = useHistory();
    const movieDetails = useSelector(store => store.movieDetails)

    return (
        <div>
            <h1>{movieDetails.title}</h1>
            <img src={movieDetails.poster} alt={movieDetails.title} />
            <p>{movieDetails.description}</p>
            <button onClick={() => history.push("/")}>Return to all movies</button>
        </div>
        
    )
};

export default MovieDetails;