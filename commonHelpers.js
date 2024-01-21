import{S as f,a as m,i as l}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const y=document.querySelector(".form"),v=document.querySelector(".search-input"),d=document.querySelector(".gallery"),p=document.querySelector(".loader"),u=new f(".gallery a",{captionDelay:250,captionsData:"alt"}),n=document.querySelector(".load-button"),g=40,i={params:{key:"41831359-da2252ca47ee8686c562d4834",q:"",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:g,page:1}},h=o=>o.data.hits.reduce((a,s)=>a+=`<li class="gallery-item">
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
                        </li>`,"");y.addEventListener("submit",async o=>{o.preventDefault(),i.params.page=1,i.params.q=v.value,p.classList.remove("is-hidden"),n.classList.add("is-hidden"),d.innerHTML="";try{const t=await m.get("https://pixabay.com/api/",i);t.data.hits.length>0?(d.innerHTML=h(t),n.classList.remove("is-hidden"),u.refresh()):l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}catch(t){console.log(t),l.error({message:"Something went wrong...",position:"topRight"})}finally{p.classList.add("is-hidden")}});n.addEventListener("click",async o=>{o.preventDefault(),i.params.page+=1;const t=await m.get("https://pixabay.com/api/",i);if(i.params.page<=Math.ceil(t.data.totalHits/g)){d.insertAdjacentHTML("beforeend",h(t)),u.refresh();const a=document.querySelector(".gallery-item");scrollBy({top:a.getBoundingClientRect().height*2,behavior:"smooth"})}else n.classList.add("is-hidden"),l.error({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})});
//# sourceMappingURL=commonHelpers.js.map
