import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import { useHistory } from "react-router-dom";



function MovieList() {

  const dispatch = useDispatch();
  const history = useHistory();
  const movies = useSelector(store => store.movies);

  const movieDetails = (movie) => {
    history.push(`/details/${movie.id}`)
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
            <div data-testid="movieItem" key={movie.id}>
              <h3>{movie.title}</h3>
                <img data-testid="toDetails" onClick ={() => movieDetails(movie)}src={movie.poster} alt={movie.title}/>
              
            </div>
          );
        })}
      </section>
    </main>

  );
}


export default MovieList;
