import './sass/main.scss';
import {FilmsAPI} from './js/film-api';
import galleryMarkup from './templates/gallery.hbs';

const filmsAPI = new FilmsAPI();
const refs = {
  form: document.querySelector('.search'),
  gallery: document.querySelector('.gallery'),
  pagPrevBtn: document.querySelector('.pagination__prev-btn'),
  pagNextBtn: document.querySelector('.pagination__next-btn'),
  startPage: document.querySelector('.header'),
}

document.addEventListener('DOMContentLoaded', onSiteLoad);
refs.form.addEventListener('submit', onFilmSearch);
refs.pagPrevBtn.addEventListener('click', onPrevPage);
refs.pagNextBtn.addEventListener('click', onNextPage);


async function onSiteLoad() {
  const { data: { results } } = await filmsAPI.getPopularFilm();
  const { data: { genres } } = await filmsAPI.updateFilmGenre();
  transformDate(results);
  transformGenre(results, genres);
  render(results);
}

async function onFilmSearch(e) {
  e.preventDefault();
  let search = e.currentTarget.elements.query.value.trim();
  if (!search) {
      return;
  }

  filmsAPI.search = search;
  filmsAPI.page = 1;
  const { data: { results } } = await filmsAPI.getFilmByName();
  const { data: { genres } } = await filmsAPI.updateFilmGenre();
  clearMarkup();
  transformDate(results);
  transformGenre(results, genres);
  render(results);
  filmsAPI.incrementPage();
  e.target.reset();
}

async function onPrevPage() {
  if (filmsAPI.page <= 1) {
    return
  }
  smoothScroll();
  filmsAPI.decrementPage();
  const { data: { results } } = await filmsAPI.getFilmByName();
  const { data: { genres } } = await filmsAPI.updateFilmGenre();
  clearMarkup();
  transformDate(results);
  transformGenre(results, genres);
  render(results);
}


async function onNextPage() {
  smoothScroll();
  filmsAPI.incrementPage();
  const { data: { results } } = await filmsAPI.getFilmByName();
  const { data: { genres } } = await filmsAPI.updateFilmGenre();
  clearMarkup();
  transformDate(results);
  transformGenre(results, genres);
  render(results);
}

function render(data) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup(data));
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

function transformDate(data) {
  data.map(item => {
    if (item.release_date) {
      item.release_date = item.release_date.slice(0, 4);
    }
      
    return item;
  });
}

function transformGenre(data, genres) {
  data.map(item => {
    let newGenre = [];

    if (item.genre_ids) {
      item.genre_ids.forEach(id => {
        const rigthID = genres.find(item => item.id === id);
        newGenre.push(rigthID.name);
      });
    }
    if (newGenre.length >= 4) {
      const manyGenres = newGenre.slice(0, 3);
      item.genres = manyGenres.join(', ');
    } else {
      item.genres = newGenre.join(', ');
    }

    return item;
  });
}

function smoothScroll() {
    refs.startPage.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
}