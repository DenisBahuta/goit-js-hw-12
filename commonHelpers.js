import{S as k,i as d,a as g}from"./assets/vendor-990f3500.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerpolicy&&(i.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?i.credentials="include":e.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(e){if(e.ep)return;e.ep=!0;const i=r(e);fetch(e.href,i)}})();const f="/goit-js-hw-12/assets/octagon-8dac5379.svg",b=document.querySelector(".form"),c=document.querySelector(".gallery"),u=document.querySelector(".loader"),a=document.querySelector("#next-btn");let o=0,y=null;const h=new k(".gallery a",{captionsData:"alt",captionDelay:250}),L="https://pixabay.com/api",v=new URLSearchParams({key:"41838546-9d950a50e841202e6c289d2dd",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:40});b.addEventListener("submit",x);a.addEventListener("click",S);async function x(s){s.preventDefault();const t=s.currentTarget.elements.input.value;if(y=t,o=1,a.classList.add("is-hidden"),c.innerHTML="",!t.trim()){d.show({title:"❕",theme:"light",message:"Please, fill in the search field",messageSize:"20px",messageColor:"#808080",backgroundColor:"#e7fc44",position:"topRight",timeout:3e3});return}u.classList.remove("is-hidden"),s.currentTarget.reset();try{const r=await C(t);if(r.hits.length===0){d.show({iconUrl:f,theme:"dark",message:"Sorry, there are no images matching your search query. Please try again!",messageSize:"16px",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:5e3});return}c.innerHTML=p(r.hits),h.refresh(),a.classList.remove("is-hidden"),m()}catch(r){w(r)}finally{u.classList.add("is-hidden")}}async function C(s){return(await g.get(`${L}/?${v}&q=${s}&page=${o}`)).data}function p(s){return s.map(({webformatURL:t,largeImageURL:r,tags:l,likes:e,views:i,comments:n,downloads:$})=>`<li class="gallery-item">
        <a class="gallery-link" href="${r}">
           <img
            class="gallery-image"
            src="${t}"
            alt="${l}"
          />
        </a>
        <div class="container-additional-info">
        <div class="container-descr-inner"><p class="description">Likes</p><span class="description-value">${e}</span></div>
        
        <div class="container-descr-inner"><p class="description">Views</p><span class="description-value">${i}</span></div>
        

        <div class="container-descr-inner"><p class="description">Comments</p><span class="description-value">${n}</span></div>
        

        <div class="container-descr-inner"><p class="description">Downloads</p><span class="description-value">${$}</span></div>
        
        </div>
      </li>`).join("")}function w(s){console.error(s),c.innerHTML="",d.show({iconUrl:f,theme:"dark",message:s.stack,messageSize:"16px",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:5e3}),a.removeEventListener("click",S),a.classList.add("is-hidden")}async function S(){u.classList.remove("is-hidden"),a.classList.add("is-hidden"),o+=1;try{const t=(await g.get(`${L}/?${v}&q=${y}&page=${o}`)).data;if(o*40>=t.totalHits){d.show({title:"❕",theme:"dark",message:"We're sorry, but you've reached the end of search results.",messageSize:"16px",messageColor:"white",backgroundColor:"#4e75ff",position:"topRight",timeout:5e3}),c.innerHTML+=p(t.hits),h.refresh(),a.classList.add("is-hidden"),m();return}c.innerHTML+=p(t.hits),h.refresh(),m(),a.classList.remove("is-hidden")}catch(s){w(s)}finally{u.classList.add("is-hidden")}}function m(){window.scrollBy({top:640,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
