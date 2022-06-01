import './sass/main.scss';
import { getFilmByName, getPopularFilm, updateFilmGenre } from './js/film-api.js';
import galleryMarkup from './templates/gallery.hbs';

const refs = {
  form: document.querySelector('.search'),
  gallery: document.querySelector('.gallery'),
}

document.addEventListener('DOMContentLoaded', onSiteLoad);
refs.form.addEventListener('submit', onFilmSearch);

async function onSiteLoad() {
  const { data: { results } } = await getPopularFilm();
  const { data: { genres } } = await updateFilmGenre();
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
  
  const { data: { results } } = await getFilmByName(search);
  const { data: { genres } } = await updateFilmGenre();
  clearMarkup();
  transformDate(results);
  transformGenre(results, genres);
  render(results);

  e.target.reset();
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