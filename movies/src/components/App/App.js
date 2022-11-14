import { useEffect, useState, useLayoutEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);

  const [searchedSavedMovies, setSearchedSavedMovies] = useState(null);

  const [numberOfMovies, setNumberOfMovies] = useState(0);
  let filteredWithoutSlice = JSON.parse(localStorage.getItem('filteredWithoutSlice'));

  const [size, setSize] = useState([0]);
  const [errorRegister, setErrorRegister] = useState('');
  const [errorLogin, setErrorLogin] = useState('');
  const [errorUpdate, setErrorUpdate] = useState('');
  const [messageUpdate, setMessageUpdate] = useState(null)

  useEffect(() => {
    mainApi.getUser()
      .then((userData) => {
        setLoggedIn(true);
        setCurrentUser(userData);
        history.push("/movies");
      })
      .catch((err) => console.log(err));
  }, [loggedIn, history]);

  useEffect(() => {
    if (loggedIn) {
      mainApi.getSavedMovies()
        .then((savedMovies) => {
          setSavedMovies(savedMovies);
        })
        .catch((err) => {
          setSavedMovies([]);
          console.log(err);
        });
    }
  }, [savedMovie, loggedIn]);

  function handleRegister(data) {
    mainApi.register(data)
      .then(() => {
        handleLogin(data);
        history.push("/movies");
      })
      .catch((error) => {
        console.log(error);
        setErrorRegister(error);
      })
  }

  function handleLogin(user) {
    mainApi.authorize(user)
      .then(() => {
        setLoggedIn(true);
        history.push("/movies");
      })
      .catch((error) => {
        console.log(error);
        setErrorLogin(error);
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
        localStorage.removeItem('moviesApi');
        localStorage.removeItem('filteredWithoutSlice');
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
        setMessageUpdate('Новые данные сохранены.')
      })
      .catch((error) => {
        console.log(error);
        setErrorUpdate(error);
      });
  }

  useEffect(() => {
    setIsShortSavedFilms(false);
    setNumberOfMovies(12);
    setErrorLogin('');
    setErrorRegister('');
    setFilteredSavedMovies(savedMovies);
    setSearchedSavedMovies(null);
    setMessageUpdate(null)

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

  function filterFilms(film, moviesForSearch) {
    let filter = moviesForSearch.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(film.toLowerCase());
    });

    setSearchedMovies(filter);
    localStorage.setItem('search', film);
    localStorage.setItem('searchedMovies', JSON.stringify(filter));
  }

  function searchMovies(film) {
    if (localStorage.getItem('moviesApi') === null) {
      setIsLoading(true);
      moviesApi.getMovies()
        .then((movies) => {
          setMovies(movies);
          localStorage.setItem('moviesApi', JSON.stringify(movies));
          filterFilms(film, movies)
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    } else {
      filterFilms(film, (JSON.parse(localStorage.getItem('moviesApi'))));
    }
  }

  function handleSwitchClick() {
    setIsShortFilms(!isShortFilms);
    localStorage.setItem('isShortFilms', !isShortFilms);
  }

  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }

    let resizeTimeout;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        updateSize();
      }, 1000)
    })

    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (size > 1280) {
      setNumberOfMovies(12);
    } else if (size < 762) {
      setNumberOfMovies(5)
    } else setNumberOfMovies(8);
  }, [size, location.pathname, searchedMovies])

  function handleClickMore() {
    if (size > 1280) {
      setNumberOfMovies(numberOfMovies + 3);
    } else if (size < 762) {
      setNumberOfMovies(numberOfMovies + 2)
    } else setNumberOfMovies(numberOfMovies + 2);
  }

  useEffect(() => {
    if (location.pathname === '/movies') {

      const searchedForFilter = JSON.parse(localStorage.getItem('searchedMovies'));
      if (searchedForFilter !== null) {

        if (isShortFilms === false) {
          const filterFilmsWithoutSlice = searchedForFilter.filter((movie) => {
            return (movie.duration > 40);
          });

          let filterFilms = filterFilmsWithoutSlice.slice(0, numberOfMovies);
          setFilteredMovies(filterFilms);
          localStorage.setItem('filteredMovies', JSON.stringify(filterFilms));
          localStorage.setItem('filteredWithoutSlice', JSON.stringify(filterFilmsWithoutSlice));

        } else {
          const filterShortFilmsWithoutSlice = searchedForFilter.filter((movie) => {
            return (movie.duration <= 40);
          });
          let filterShortFilms = filterShortFilmsWithoutSlice.slice(0, numberOfMovies);
          setFilteredMovies(filterShortFilms);
          localStorage.setItem('filteredMovies', JSON.stringify(filterShortFilms));
          localStorage.setItem('filteredWithoutSlice', JSON.stringify(filterShortFilmsWithoutSlice));
        }
      }
    }
  }, [isShortFilms, location.pathname, numberOfMovies, searchedMovies, size])

  function searchSavedMovies(film) {
    const filter = savedMovies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(film.toLowerCase());
    });
    setSearchedSavedMovies(filter);
  }

  function handleSwitchClickSaved() {
    setIsShortSavedFilms(!isShortSavedFilms);
  }

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      if (searchedSavedMovies !== null) {
        if (isShortSavedFilms === false) {
          const filterFilms = searchedSavedMovies.filter((movie) => {
            return (movie.duration > 40);
          });
          setFilteredSavedMovies(filterFilms);

        } else {
          const filterShortFilms = searchedSavedMovies.filter((movie) => {
            return (movie.duration <= 40);
          });
          setFilteredSavedMovies(filterShortFilms);
        }
      }
    }
  }, [isShortSavedFilms, location.pathname, searchedSavedMovies])

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

          <Header 
            loggedIn={loggedIn}
          />

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
              isLoading={isLoading}
              onClickMore={handleClickMore}
              filteredWithoutSlice={filteredWithoutSlice}
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
              error = {errorUpdate}
              message = {messageUpdate}
            />

            <Route path="/signup">
              <Register
                onRegister={handleRegister}
                error = {errorRegister}
              />
            </Route>

            <Route path="/signin">
              <Login
                onLogin={handleLogin}
                error = {errorLogin}
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
