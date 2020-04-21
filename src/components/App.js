import React, { useReducer, useEffect } from 'react';
import '../App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search'

const MOVIE_APP_URL = "https://www.omdbapi.com/?s=man&apikey=8133e0b2"; // you should replace this with yours

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }

}

const App = () => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    fetch(MOVIE_APP_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.Search
        });
      });
  }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=8133e0b2`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            payload: jsonResponse.Error
          })
        }
      });
  }

  const { movies, errorMessage, loading } = state;

  return (
    <div className="App">
      <Header text="Movie Search App" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
              movies.map((movie, index) => (
                <Movie key={`${index}-${movie.Title}`} movie={movie} />
              ))
            )}
      </div>
    </div>
  );
}

export default App;
