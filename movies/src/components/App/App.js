import Header from '../Header/Header';
import Main from '../Main/Main'
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login'
import NotFound from '../NotFound/NotFound';
import { Route, Switch } from 'react-router-dom';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

function App() { 

  return (
    <div className="App">
      <div className="page">

        <Header />

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <Route exact path="/movies">
            <Movies />
          </Route>

          <Route exact path="/saved-movies">
            <SavedMovies />
          </Route>

          <Route exact path="/profile">
            <Profile />
          </Route>

          <Route path="/signup">
            <Register />
          </Route>

          <Route path="/signin">
            <Login />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>

      <Footer />
      </div>
    </div>
  );
}

export default App;
