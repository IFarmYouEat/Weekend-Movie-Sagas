import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails);
}

function* fetchAllMovies() {
  try {
    // Get the movies:
    const moviesResponse = yield axios.get('/api/movies');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}

function* fetchMovieDetails(action){
  try {
    const movie = yield axios.get(`api/movies/${action.payload}`);
    yield put ({
      type: 'SET_MOVIE_DETAILS',
      payload: movie.data
      });
    const genres = yield axios.get(`api/genres/${action.payload}`);
    yield put ({
      type: 'SET_MOVIE_GENRES',
      payload: genres.data
    })
    console.log(genres.data);
  } catch (error) {
    console.log('Error in fetchMovieDetails', error)
  }
}


// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
}

// Used to store selected movie
const movieDetails = ( state = {}, action) => {
  switch (action.type) {
    case 'SET_MOVIE_DETAILS':
      return action.payload;
      default:
        return state;
  }
}

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}

// Used to store the genres to a specific movie
const movieGenres = (state = [], action) => {
  switch(action.type) {
    case 'SET_MOVIE_GENRES':
      return action.payload;
    default:
      return state;
  }
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    movieDetails,
    movieGenres,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
