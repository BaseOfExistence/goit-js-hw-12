import{S as y,a as u,i as d}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const v=document.querySelector(".form"),L=document.querySelector(".search-input"),p=document.querySelector(".gallery"),m=document.querySelector(".loader"),g=new y(".gallery a",{captionDelay:250,captionsData:"alt"}),l=document.querySelector(".load-button"),h=40;let i=1;const n={params:{key:"41831359-da2252ca47ee8686c562d4834",q:"",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:h,page:i}},f=o=>o.data.hits.reduce((a,s)=>a+=`<li class="gallery-item">
                            <a href="${s.largeImageURL}">
                                <img class="gallery-img" src="${s.webformatURL}" alt="${s.tags}"/>
                            </a>
                            <div class="img-text-cont">
                                <div class="img-text">
                                    <p>Likes</p>
                                    <p>${s.likes}</p>
                                </div>
                                <div class="img-text">
                                    <p>Views</p>
                                    <p>${s.views}</p>
                                </div>
                                <div class="img-text">
                                    <p>Comments</p>
                                    <p>${s.comments}</p>
                                </div>
                                <div class="img-text">
                                    <p>Downloads</p>
                                    <p>${s.downloads}</p>
                                </div>
                            </div>
                        </li>`,"");v.addEventListener("submit",async o=>{o.preventDefault(),i=1,n.params.page=i,n.params.q=L.value,m.classList.remove("is-hidden"),l.classList.add("is-hidden"),p.innerHTML="";try{const t=await u.get("https://pixabay.com/api/",n);t.data.hits.length>0?(p.innerHTML=f(t),l.classList.remove("is-hidden"),g.refresh()):d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}catch(t){console.log(t),d.error({message:"Something went wrong...",position:"topRight"})}finally{m.classList.add("is-hidden")}});l.addEventListener("click",async o=>{o.preventDefault(),i+=1,n.params.page=i;const t=await u.get("https://pixabay.com/api/",n);if(i<=Math.ceil(t.data.totalHits/h)){p.insertAdjacentHTML("beforeend",f(t)),g.refresh();const a=document.querySelector(".gallery-item");scrollBy({top:a.getBoundingClientRect().height*2,behavior:"smooth"})}else l.classList.add("is-hidden"),d.error({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})});
//# sourceMappingURL=commonHelpers.js.map
