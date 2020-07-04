const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com',{
        params: {
            apikey: "78fb5d96",
            s: searchTerm
        }
    })

    if(response.data.Error){
        return [];
    }

    return response.data.Search;

}

const root = document.querySelector('.autocomplete');

root.innerHTML = `
    <label><b>Search for a Movies</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultDropdown = document.querySelector('.results');

const onInput = async (event) => {
    const movies = await fetchData(event.target.value);

    resultDropdown.innerHTML = '';
    
    if(!movies.length){
        dropdown.classList.remove('is-active');
        return;
    }

    dropdown.classList.add('is-active');
    movies.forEach((movie) => {
        const option = document.createElement('a');
        option.classList.add('dropdown-item');

        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

        option.innerHTML = `
        <img src = '${imgSrc}' />
        ${movie.Title} (${movie.Year})
        `

        option.addEventListener('click',() => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            onOptionSelect(movie.imdbID);
        })

        resultDropdown.appendChild(option);
    })
}

input.addEventListener('input', debounce(onInput, 500))

const onOptionSelect =async (movieId) => {
    const response = await axios.get('http://www.omdbapi.com', {
        params: {
            apikey: "78fb5d96",
            i: movieId
        }
    })
    
    document.querySelector('.result').innerHTML = renderResult(response.data);
    
}


const renderResult = (movieDetail) => {
    
    const imgSource = movieDetail.Poster === 'N/A' ? '' : movieDetail.Poster;

    return `
        <article class="media">
            <figure class="media-left">
                <p class = "image">
                    <img src="${imgSource}" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
}