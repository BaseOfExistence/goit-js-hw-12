import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

const form = document.querySelector(".form");
const searchInput = document.querySelector(".search-input");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
});
const loadButton = document.querySelector(".load-button");
const imgLimit = 40;
let pages = 1;
const httpParams = {
    params: {
        key: "41831359-da2252ca47ee8686c562d4834",
        q: "",
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        per_page: imgLimit,
        page: pages
    }
}
const imgHTML = (resolve) => {
    const html = resolve.data.hits.reduce((acum, elem) => {
        return acum += `<li class="gallery-item">
                            <a href="${elem.largeImageURL}">
                                <img class="gallery-img" src="${elem.webformatURL}" alt="${elem.tags}"/>
                            </a>
                            <div class="img-text-cont">
                                <div class="img-text">
                                    <p>Likes</p>
                                    <p>${elem.likes}</p>
                                </div>
                                <div class="img-text">
                                    <p>Views</p>
                                    <p>${elem.views}</p>
                                </div>
                                <div class="img-text">
                                    <p>Comments</p>
                                    <p>${elem.comments}</p>
                                </div>
                                <div class="img-text">
                                    <p>Downloads</p>
                                    <p>${elem.downloads}</p>
                                </div>
                            </div>
                        </li>`
    }, "");
    return html;
}
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    pages = 1;
    httpParams.params.page = pages;
    httpParams.params.q = searchInput.value;
    loader.classList.remove("is-hidden");
    loadButton.classList.add("is-hidden");
    gallery.innerHTML = "";
    try {
        const resolve = await axios.get(`https://pixabay.com/api/`, httpParams);
        if (resolve.data.hits.length > 0) {   
            gallery.innerHTML = imgHTML(resolve);
            loadButton.classList.remove("is-hidden")
            lightbox.refresh();
        } else {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight'
            });
        }
    } catch (error) {
        console.log(error)
        iziToast.error({
            message: "Something went wrong...",
            position: 'topRight'
        });
    } finally {
        loader.classList.add("is-hidden")
    };
});
loadButton.addEventListener("click", async (event) => {
    event.preventDefault();
    pages += 1;
    httpParams.params.page = pages;
    const resolve = await axios.get(`https://pixabay.com/api/`, httpParams);
    if (pages <= Math.ceil(resolve.data.totalHits / imgLimit)) {
        gallery.insertAdjacentHTML("beforeend", imgHTML(resolve));
        lightbox.refresh();
        const galleryItem = document.querySelector(".gallery-item");
        scrollBy({
            top: galleryItem.getBoundingClientRect().height * 2,
            behavior: "smooth",
        });
    } else {
        loadButton.classList.add("is-hidden");
        iziToast.error({
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight'
        });
    }
});