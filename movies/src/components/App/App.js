import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main'
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login'
import NotFound from '../NotFound/NotFound';
import { Route, Switch, useHistory } from 'react-router-dom';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function App() {
  const history = useHistory();
  let location = useLocation();

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMovie, setSavedMovie] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  const [isShortFilms, setIsShortFilms] = useState(false);
  const [isShortSavedFilms, setIsShortSavedFilms] = useState(false);

  useEffect(() => {
    moviesApi.getMovies()
      .then((movies) => {
        setMovies(movies);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    mainApi.getUser()
      .then((userData) => {
        setLoggedIn(true);
        setCurrentUser(userData);
        history.push('/movies');
      })
      .catch((err) => console.log(err));
  }, [loggedIn, history]);

  useEffect(() => {
      mainApi.getSavedMovies()
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
      })
      .catch((err) => console.log(err));
  }, [savedMovie, location.pathname]);

  function handleRegister(data) {
    mainApi.register(data)
      .then(() => {
        handleLogin(data);
        history.push("/movies");
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleLogin(user) {
    mainApi.authorize(user)
      .then(() => {
        setLoggedIn(true);
        history.push("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogout() {
    mainApi.logout()
      .then(() => {
        setLoggedIn(false);
        setCurrentUser({});
        setSavedMovies([]);
        localStorage.removeItem('search');
        localStorage.removeItem('searchedMovies');
        localStorage.removeItem('filteredMovies');
        localStorage.removeItem('isShortFilms');
        localStorage.removeItem('searchedSavedMovies');
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    mainApi.editUserInfo(data)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    setIsShortSavedFilms(false);
    
    if (location.pathname === '/movies') {
      if (localStorage.getItem('isShortFilms') === null) {
        setIsShortFilms(false);
      } else { 
        setIsShortFilms(JSON.parse(localStorage.getItem('isShortFilms'))); 
      }
  
      if ((JSON.parse(localStorage.getItem('filteredMovies'))) === null) {
        setFilteredMovies([]);
      } else { 
        setFilteredMovies(JSON.parse(localStorage.getItem('filteredMovies'))); 
      }
    }
  }, [location.pathname])

  function searchMovies(film) {
    let filter = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(film.toLowerCase());
    });
    setSearchedMovies(filter);
    localStorage.setItem('search', film);
    localStorage.setItem('searchedMovies', JSON.stringify(filter));
  }

  function handleSwitchClick() {
    setIsShortFilms(!isShortFilms);
    localStorage.setItem('isShortFilms', !isShortFilms);
  }

  useEffect(() => {
    if (location.pathname === '/movies') {
      const searchedForFilter = JSON.parse(localStorage.getItem('searchedMovies'));
      if (searchedForFilter !== null) {
  
        if (isShortFilms === false) {
          const filterFilms = searchedForFilter.filter((movie) => {
            return (movie.duration > 40);
          });
          setFilteredMovies(filterFilms);
          localStorage.setItem('filteredMovies', JSON.stringify(filterFilms));
  
        } else {
          const filterShortFilms = searchedForFilter.filter((movie) => {
            return (movie.duration <= 40);
          });
          setFilteredMovies(filterShortFilms);
          localStorage.setItem('filteredMovies', JSON.stringify(filterShortFilms));
        }
      }
    }
  }, [isShortFilms, location.pathname, searchedMovies])

  function searchSavedMovies(film) {
    const filter = savedMovies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(film.toLowerCase());
    });
    setSavedMovies(filter);
    localStorage.setItem('searchedSavedMovies', JSON.stringify(filter));
  }

  function handleSwitchClickSaved() {
    setIsShortSavedFilms(!isShortSavedFilms);
  }

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      if (savedMovies !== null) {
        if (isShortSavedFilms === false) {
          const filterFilms = savedMovies.filter((movie) => {
            return (movie.duration > 40);
          });
          setFilteredSavedMovies(filterFilms);

        } else {
          const filterShortFilms = savedMovies.filter((movie) => {
            return (movie.duration <= 40);
          });
          setFilteredSavedMovies(filterShortFilms);
        }
      }
    }
  }, [isShortSavedFilms, location.pathname, savedMovies])

  function deleteMovie(movie) {
    mainApi.deleteSavedMovie(movie)
      .then((m) => {
        setSavedMovie(m);
      })
      .catch((err) => console.log(err));
  }

  function saveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((movie) => {
        setSavedMovie(movie);
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(movie) {
    if (savedMovies.some((m) => m.movieId === movie.id)) {
      const movieDelete = savedMovies.find((m) => m.movieId === movie.id);
      deleteMovie(movieDelete);
    } else { saveMovie(movie); }
  }

  function handleSavedCardDelete(movie) {
    deleteMovie(movie);
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">

          <Header />

          <Switch>
            <Route exact path="/">
              <Main />
            </Route>

            <ProtectedRoute
              path="/movies"
              component={Movies}
              movies={filteredMovies}
              searchMovies={searchMovies}
              onCardLike={handleCardLike}
              savedMovies={savedMovies}
              loggedIn={loggedIn}
              isShortFilms={isShortFilms}
              handleSwitchClick={handleSwitchClick}
            />

            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              movies={filteredSavedMovies}
              searchMovies={searchSavedMovies}
              onCardLike={handleSavedCardDelete}
              savedMovies={savedMovies}
              loggedIn={loggedIn}
              isShortFilms={isShortSavedFilms}
              handleSwitchClick={handleSwitchClickSaved}
            />

            <ProtectedRoute
              path="/profile"
              component={Profile}
              onLogout={handleLogout}
              onUpdateUser={handleUpdateUser}
              loggedIn={loggedIn}
            />

            <Route path="/signup">
              <Register
                onRegister={handleRegister}
              />
            </Route>

            <Route path="/signin">
              <Login
                onLogin={handleLogin}
              />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>

          <Footer />
        </div>
      </CurrentUserContext.Provider >
    </div>
  );
}

export default App;
