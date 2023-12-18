import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import { useHistory } from "react-router-dom";
import MovieDetails from '../MovieDetails/MovieDetails.jsx'


function MovieList() {

  const dispatch = useDispatch();
  const history = useHistory();
  const movies = useSelector(store => store.movies);

  const movieDetails = (movie) => {
    dispatch({ type: 'SET_MOVIE_DETAILS', payload: movie})
    history.push("/details")
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  return (
    <main>
      <h1>MovieList</h1>
      <section className="movies">
        {movies.map(movie => {
          return (
            <div data-testid='movieItem' key={movie.id}>
              <h3>{movie.title}</h3>
                <img onClick ={() => movieDetails(movie)}src={movie.poster} alt={movie.title}/>
              
            </div>
          );
        })}
      </section>
    </main>

  );
}


export default MovieList;
