createAutoComplete({
    root: document.querySelector('#left-autocomplete'),
    renderOption(movie){
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

        return `
            <img src = '${imgSrc}' />
            ${movie.Title} (${movie.Year})
            `
    },
    onOptionSelect(movie){
        onOptionSelect(movie)
    },
    inputValue(movie){
        return movie.Title;
    },
    async fetchData(searchTerm){
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

})

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