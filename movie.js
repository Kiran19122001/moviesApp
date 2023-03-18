const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';

const imagpath = 'https://image.tmdb.org/t/p/w1280'
const searchapi='https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query='

const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")

//initial popular movies
getMovies(APIURL)   
async function getMovies(url) {
    const resp = await fetch(url)
    const respData = await resp.json()
    console.log(respData)
    showMovies(respData.results)
    
}

function showMovies(movies) {
    main.innerHTML = ''
    
    movies.forEach((movie) => {
        let{poster_path,title,vote_average,overview}=movie   
        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")
        movieEl.innerHTML = `
            <img src="${imagpath+poster_path}" alt="">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getRating(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
            <h4>Overview</h4>
               ${overview}
            </div>

            `;
        main.appendChild(movieEl)
    })
    
}
function getRating(vote) {
    if (vote >= 8) {
        return "green"
    }
    else if (vote >= 5) {
        return "orange"
    }
    else {
        return "red"
    }
    
}
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let searchTerm = search.value
    
    if (searchTerm) {
       getMovies(searchapi + searchTerm)
       
        search.value=""
   }
    
})