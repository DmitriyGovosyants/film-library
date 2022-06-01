import axios from "axios";

const API_KEY = 'bfe20768c956c05046c7d088e4b361cd';
const BASE_URL = 'https://api.themoviedb.org/3';
const START_PATH = '/movie/popular';
const GENRE_PATH = '/genre/movie/list';
const SEARCH_PATH = '/search/movie';


async function getPopularFilm() {
    return await axios.get(`${BASE_URL}${START_PATH}?api_key=${API_KEY}&page=1`);
}

async function updateFilmGenre() {
    return await axios.get(`${BASE_URL}${GENRE_PATH}?api_key=${API_KEY}`);
}

async function getFilmByName(search) {
    return await axios.get(`${BASE_URL}${SEARCH_PATH}?api_key=${API_KEY}&query=${search}&page=1`);
}

export { getFilmByName, getPopularFilm, updateFilmGenre };