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
  const [moviesSearch, setMoviesSearch] = useState([]);

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
    moviesApi.getMovies()
      .then((movies) => {
        setMovies(movies);
      })
      .catch((err) => console.log(err));
  }, []);

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
        localStorage.removeItem('search');
        localStorage.removeItem('searchMovies');
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

  function searchMovies(film) {
    let filter = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(film.toLowerCase());
    });
    setMoviesSearch(filter);
    localStorage.setItem('search', film);
    localStorage.setItem('searchMovies', JSON.stringify(filter));
  }

  useEffect(() => {
    if (localStorage.getItem('searchMovies') === null) {
      setMoviesSearch([]);
    } else {
      setMoviesSearch(JSON.parse(localStorage.getItem('searchMovies')));
    }
  }, [location.pathname])

  function searchSavedMovies(film) {
    const filter = savedMovies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(film.toLowerCase());
    });
    setSavedMovies(filter);
  }

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

  function handleSavedCardLike(movie) {
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
              movies={moviesSearch}
              searchMovies={searchMovies}
              onCardLike={handleCardLike}
              savedMovies={savedMovies}
              loggedIn={loggedIn}
            />

            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              movies={savedMovies}
              searchMovies={searchSavedMovies}
              onCardLike={handleSavedCardLike}
              savedMovies={savedMovies}
              loggedIn={loggedIn}
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
