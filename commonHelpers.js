import{S as y,a as u,i as d}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const f=document.querySelector(".form"),v=document.querySelector(".search-input"),p=document.querySelector(".gallery"),m=document.querySelector(".loader"),L=new y(".gallery a",{captionDelay:250,captionsData:"alt"}),l=document.querySelector(".load-button"),g=40;let i=1;const n={params:{key:"41831359-da2252ca47ee8686c562d4834",q:"",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:g,page:i}},h=r=>r.data.hits.reduce((a,o)=>a+=`<li class="gallery-item">
                            <a href="${o.largeImageURL}">
                                <img class="gallery-img" src="${o.webformatURL}" alt="${o.tags}"/>
                            </a>
                            <div class="img-text-cont">
                                <div class="img-text">
                                    <p>Likes</p>
                                    <p>${o.likes}</p>
                                </div>
                                <div class="img-text">
                                    <p>Views</p>
                                    <p>${o.views}</p>
                                </div>
                                <div class="img-text">
                                    <p>Comments</p>
                                    <p>${o.comments}</p>
                                </div>
                                <div class="img-text">
                                    <p>Downloads</p>
                                    <p>${o.downloads}</p>
                                </div>
                            </div>
                        </li>`,"");f.addEventListener("submit",async r=>{r.preventDefault(),i=1,n.params.page=i,n.params.q=v.value,m.classList.remove("is-hidden"),l.classList.add("is-hidden"),p.innerHTML="";try{const t=await u.get("https://pixabay.com/api/",n);t.data.hits.length>0?(p.innerHTML=h(t),l.classList.remove("is-hidden"),L.refresh()):d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}catch(t){console.log(t),d.error({message:"Something went wrong...",position:"topRight"})}finally{m.classList.add("is-hidden")}});l.addEventListener("click",async r=>{r.preventDefault(),i+=1,n.params.page=i;const t=await u.get("https://pixabay.com/api/",n);if(i<Math.ceil(t.data.totalHits/g)){p.insertAdjacentHTML("beforeend",h(t));const a=document.querySelector(".gallery-item");scrollBy({top:a.getBoundingClientRect().height*2,behavior:"smooth"})}else l.classList.add("is-hidden"),d.error({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})});
//# sourceMappingURL=commonHelpers.js.map
