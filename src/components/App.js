import React { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search'

const MOVIE_APP_URL = "https://www.omdbapi.com/?s=man&apikey=8133e0b2"; // you should replace this with yours

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_APP_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=8133e0b2`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  }

  return (
    <div className="App">
    </div>
  );
}

export default App;
