import './sass/main.scss';
import { fetch } from './js/film-api.js';
import galleryMarkup from './templates/gallery.hbs';

const refs = {
    form: document.querySelector('.search'),
    gallery: document.querySelector('.gallery'),
}

refs.form.addEventListener('submit', onSearch);

async function onSearch(e) {
    e.preventDefault();
    let search = e.currentTarget.elements.query.value.trim();
    if (!search) {
        return;
    }
    
    const { data: {results} } = await fetch(search);
    clearMarkup();
    render(results);

    e.target.reset();
}

document.addEventListener('DOMContentLoaded', async () => {
    const { data: {results} } = await fetch('iron man');
    render(results);
})

function render(results) {
    refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup(results));
}

function clearMarkup() {
    refs.gallery.innerHTML = '';
}

