const API_KEY='api_key=07997445e1da971882b28457e8eab403'
const BASE_URL='https://api.themoviedb.org/3'
const API_URL= BASE_URL + '/discover/movie?sort_by=popularity.desc&' +API_KEY
const IMG_URL='https://image.tmdb.org/t/p/w500'
const searchURL=BASE_URL+'/search/movie?'+API_KEY


document.addEventListener('DOMContentLoaded', function() {
  const grid = document.getElementById('grid');
  const form =document.getElementById('form');
  const search=document.getElementById('in');

getMovies(API_URL);

// fetching data

async function getMovies(url) {
  try {
      const res = await fetch(url);
      const data = await res.json();
      showMovies(data.results);
      console.log(data);
  } catch (error) {
      console.error(error);
  }
}

//showing movies list
function showMovies(data) {
  grid.innerHTML='';
    data.forEach(movie => {
      const { title, poster_path } = movie; // destructuring the object
      const movieL = document.createElement('div'); //creating new div
      movieL.classList.add('card'); // adding class named card
      movieL.style.background = `linear-gradient(180deg, rgba(29, 29, 29, 0) 0%, rgba(29, 29, 29, 0.8) 80.79%), url(${IMG_URL + poster_path})`;// Set the background with linear gradient and image URL
      movieL.innerHTML = `
        <h2 id="title">${title}</h2>
      `;
      grid.appendChild(movieL);
    });
  }
  //adding search functionality
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchTerm=search.value;
    if(searchTerm){
        getMovies(searchURL + '&query='+searchTerm);
    }
  })
});