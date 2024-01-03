import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";


function MovieDetails() {

    const history = useHistory();
    const dispatch = useDispatch();
    const movieDetails = useSelector(store => store.movieDetails);
    const movieGenres = useSelector(store => store.movieGenres);
    const { movieId }  = useParams();
    console.log(movieGenres)

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIE_DETAILS', payload: movieId})
    }, [movieId])

    return (
        <div data-testid="movieDetails">
            <h1>{movieDetails.title}</h1>
            <img src={movieDetails.poster} alt={movieDetails.title} />
            <p>{movieDetails.description}</p>
            <h2>Genres:</h2>
            <ul>
                {movieGenres.map(genre => {
                    return (
                        <li>{genre.name}</li>
                    )
                })}
            </ul>
            <button data-testid="toList" onClick={() => history.push("/")}>Return to all movies</button>
        </div>
        
    )
};

export default MovieDetails;