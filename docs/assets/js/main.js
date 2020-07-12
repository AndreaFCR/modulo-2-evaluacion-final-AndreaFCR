"use strict";let series=[],favourites=[];const textInput=document.querySelector(".js-input"),createApiUrl=()=>"http://api.tvmaze.com/search/shows?q="+textInput.value,getDataFromApi=()=>{fetch("http://api.tvmaze.com/search/shows?q="+textInput.value).then(e=>e.json()).then(e=>{series=[];e.map(e=>series.push(e.show))})};textInput.addEventListener("keyup",getDataFromApi);const searchSeries=e=>{e.preventDefault(),paintSeries(),paintFavourites(),addBackgroundSearch()},paintSeries=()=>{let e="";for(let t=0;t<series.length;t++)e+=`<article class="serie serieBackground js-serie " id=${series[t].id}>`,null!==series[t].image?e+=`<img src="${series[t].image.medium}" \n        class="serie__img" alt="Foto de la serie ${series[t].name}"/>`:e+=`<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" \n        class="serie__img" alt="Foto de la serie ${series[t].name}"/>`,e+=`<h3 class="serie__title">${series[t].name}</h3>`,e+="</article>";const t=document.querySelector(".js-searchContainer"),s=document.querySelector(".js-searchTitle");t.innerHTML=e,0!==series.length&&(s.innerHTML="<h2>Resultados de la búsqueda:</h2>"),listenSeriesElements()},paintFavourites=()=>{let e="";0!==favourites.length&&(e+='<h2 class="favourite__title">Series favoritas</h2>');for(let t=0;t<favourites.length;t++)e+=`<article class="favourite js-favourite" id=${favourites[t].id}>`,null!==favourites[t].image?e+=`<img src="${favourites[t].image.medium}" \n        class="favourite__img" alt="Foto de la serie ${favourites[t].name}"/>`:e+=`<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" \n        class="favourite__img" alt="Foto de la serie ${favourites[t].name}"/>`,e+=`<h3 class="favourite__title">${favourites[t].name}</h3>`,e+=`<div class="favourite__btn js-btnDelete" id=${favourites[t].id}><i class="fa fa-window-close" aria-hidden="true"></i></<div>`,e+="</article>";document.querySelector(".js-favContainer").innerHTML=e,listenResetBtn(),listenSeriesElements()},saveFavourites=e=>{const t=parseInt(e.currentTarget.id),s=series.find(e=>e.id===t);void 0===favourites.find(e=>e.id===t)&&favourites.push(s),updateLocalStorage(),paintFavourites(),addBackgroundFavourite(e)},addBackgroundSearch=()=>{for(const e of series)for(const t of favourites){let s=document.getElementById(e.id),r=t.id;e.id===r&&(s.classList.add("serieBackgroundSelected"),s.classList.remove("serieBackground"))}},addBackgroundFavourite=e=>{const t=document.getElementById(e.currentTarget.id);t.classList.add("serieBackgroundSelected"),t.classList.remove("serieBackground")},addBackgroundNormal=e=>{const t=document.getElementById(e.currentTarget.id);t.classList.add("serieBackground"),t.classList.remove("serieBackgroundSelected")},searchBtn=document.querySelector(".js-searchBtn");searchBtn.addEventListener("click",searchSeries);const listenSeriesElements=()=>{const e=document.querySelectorAll(".js-serie");for(let t=0;t<e.length;t++)e[t].addEventListener("click",saveFavourites)},resetFavourites=e=>{const t=parseInt(e.currentTarget.id),s=favourites.findIndex(e=>e.id===t);favourites.splice(s,1),updateLocalStorage(),paintFavourites(),addBackgroundNormal(e)},listenResetBtn=()=>{const e=document.querySelectorAll(".js-btnDelete");for(let t of e)t.addEventListener("click",resetFavourites)},updateLocalStorage=()=>{localStorage.setItem("favourites",JSON.stringify(favourites))},getFromLocalStorage=()=>{const e=JSON.parse(localStorage.getItem("favourites"));null!==e&&(favourites=e)};getFromLocalStorage(),paintFavourites();