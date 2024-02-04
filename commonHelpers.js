import{S as $,i as d,a as g}from"./assets/vendor-990f3500.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const f="/goit-js-hw-12/assets/icons-36e117ab.svg",k=document.querySelector(".form"),c=document.querySelector(".gallery"),u=document.querySelector(".loader"),a=document.querySelector("#next-btn");let o=0,y=null;const h=new $(".gallery a",{captionsData:"alt",captionDelay:250}),L="https://pixabay.com/api",v=new URLSearchParams({key:"41838546-9d950a50e841202e6c289d2dd",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:40});k.addEventListener("submit",x);a.addEventListener("click",S);async function x(t){t.preventDefault();const s=t.currentTarget.elements.input.value;if(y=s,o=1,a.classList.add("is-hidden"),c.innerHTML="",!s.trim()){d.show({title:"❕",theme:"light",message:"Please, fill in the search field",messageSize:"20px",messageColor:"#FFFFFF",backgroundColor:"#EF4040",position:"topRight",timeout:3e3});return}u.classList.remove("is-hidden"),t.currentTarget.reset();try{const i=await E(s);if(i.hits.length===0){d.show({iconUrl:f,theme:"dark",message:"Sorry, there are no images matching your search query. Please try again!",messageSize:"16px",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:5e3});return}c.insertAdjacentHTML("beforeend",p(i.hits)),h.refresh(),a.classList.remove("is-hidden"),m()}catch(i){w(i)}finally{u.classList.add("is-hidden")}}async function E(t){try{return(await g.get(`${L}/?${v}&q=${t}&page=${o}`)).data}catch(s){throw new Error(s)}}function p(t){return t.map(({webformatURL:s,largeImageURL:i,tags:l,likes:e,views:r,comments:n,downloads:b})=>`<li class="gallery-item">
        <a class="gallery-link" href="${i}">
           <img
            class="gallery-image"
            src="${s}"
            alt="${l}"
          />
        </a>
        <div class="container-additional-info">
        <div class="container-descr-inner"><p class="description">Likes</p><span class="description-value">${e}</span></div>
        
        <div class="container-descr-inner"><p class="description">Views</p><span class="description-value">${r}</span></div>
        

        <div class="container-descr-inner"><p class="description">Comments</p><span class="description-value">${n}</span></div>
        

        <div class="container-descr-inner"><p class="description">Downloads</p><span class="description-value">${b}</span></div>
        
        </div>
      </li>`).join("")}function w(t){console.error(t),c.innerHTML="",d.show({iconUrl:f,theme:"dark",message:t.stack,messageSize:"16px",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:5e3}),a.removeEventListener("click",S),a.classList.add("is-hidden")}async function S(){u.classList.remove("is-hidden"),a.classList.add("is-hidden"),o+=1;try{const s=(await g.get(`${L}/?${v}&q=${y}&page=${o}`)).data;if(o*40>=s.totalHits){d.show({title:"❕",theme:"dark",message:"We're sorry, but you've reached the end of search results.",messageSize:"16px",messageColor:"white",backgroundColor:"#4e75ff",position:"topRight",timeout:5e3}),c.innerHTML+=p(s.hits),h.refresh(),a.classList.add("is-hidden"),m();return}c.innerHTML+=p(s.hits),h.refresh(),m(),a.classList.remove("is-hidden")}catch(t){w(t)}finally{u.classList.add("is-hidden")}}function m(){window.scrollBy({top:640,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
