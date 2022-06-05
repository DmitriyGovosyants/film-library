import axios from "axios";

export class FilmsAPI {
    constructor() {
        this.API_KEY = 'bfe20768c956c05046c7d088e4b361cd';
        this.BASE_URL = 'https://api.themoviedb.org/3';
        this.START_PATH = '/movie/popular';
        this.GENRE_PATH = '/genre/movie/list';
        this.SEARCH_PATH = '/search/movie';
        this.page = 1;
        this.search = '';
    }

    async getPopularFilm() {
        return await axios.get(`${this.BASE_URL}${this.START_PATH}?api_key=${this.API_KEY}`);
    }

    async updateFilmGenre() {
        return await axios.get(`${this.BASE_URL}${this.GENRE_PATH}?api_key=${this.API_KEY}`);
    }

    async getFilmByName() {
        return await axios.get(`${this.BASE_URL}${this.SEARCH_PATH}?api_key=${this.API_KEY}&query=${this.search}&page=${this.page}`);
    }

    incrementPage() {
        this.page += 1;
    }

    decrementPage() {
        this.page -= 1;
    }
}