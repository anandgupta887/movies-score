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
        resultDropdown.appendChild(option);
    })
}

input.addEventListener('input', debounce(onInput, 500))