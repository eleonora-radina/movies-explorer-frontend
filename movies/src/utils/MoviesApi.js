class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  } 

  getMovies() {
    return fetch(this._url, {
      headers: this._headers
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies', 
  headers: {
    'Content-Type': 'application/json',
  }
});

export default moviesApi;