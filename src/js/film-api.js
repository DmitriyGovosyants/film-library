import axios from "axios";

const API_KEY = 'bfe20768c956c05046c7d088e4b361cd';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

async function fetch(search) {
    return await axios.get(`${BASE_URL}?api_key=${API_KEY}&query=${search}&page=1`);
}

export { fetch };