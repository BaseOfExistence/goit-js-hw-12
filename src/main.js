import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector(".form");
const searchInput = document.querySelector(".search-input");
const gallery = document.querySelector(".gallery")
const loader = document.querySelector(".loader")
const searchParams = new URLSearchParams({
    key: "41831359-da2252ca47ee8686c562d4834",
    q: "cat",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true"
});
const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
});
form.addEventListener("submit", (event) => {
    event.preventDefault();
    loader.classList.remove("is-hidden");
    searchParams.set("q", searchInput.value);
    gallery.innerHTML = "";
    fetch(`https://pixabay.com/api/?${searchParams}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.hits.length > 0) {
                const html = data.hits.reduce((acum, elem) => {
                    return acum += `<li class="galleryItem">
                                <a href="${elem.largeImageURL}">
                                    <img class="galleryImg" src="${elem.webformatURL}" alt="${elem.tags}"/>
                                </a>
                                <div class="imgTextCont">
                                    <div class="imgText">
                                        <p>Likes</p>
                                        <p>${elem.likes}</p>
                                    </div>
                                    <div class="imgText">
                                        <p>Views</p>
                                        <p>${elem.views}</p>
                                    </div>
                                    <div class="imgText">
                                        <p>Comments</p>
                                        <p>${elem.comments}</p>
                                    </div>
                                    <div class="imgText">
                                        <p>Downloads</p>
                                        <p>${elem.downloads}</p>
                                    </div>
                                </div>
                             </li>`
                }, "");
                gallery.innerHTML = html;
                lightbox.refresh();
            } else {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight'
                });
            }
        })
        .catch(error => {
            console.log(error)
            iziToast.error({
                    message: error,
                    position: 'topRight'
            });
        })
        .finally(loader.classList.add("is-hidden"));
});