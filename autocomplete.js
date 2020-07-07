const createAutoComplete = ({
    root,
    renderOption, 
    onOptionSelect, 
    inputValue, 
    fetchData
    }) => {
    root.innerHTML = `
        <label><b>Search for a Movies</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultDropdown = root.querySelector('.results');

    const onInput = async (event) => {
        const items = await fetchData(event.target.value);

        resultDropdown.innerHTML = '';
        
        if(!items.length){
            dropdown.classList.remove('is-active');
            return;
        }

        dropdown.classList.add('is-active');
        items.forEach((item) => {
            const option = document.createElement('a');
            option.classList.add('dropdown-item');

            option.innerHTML = renderOption(item);

            option.addEventListener('click',() => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item.imdbID);
            })

            resultDropdown.appendChild(option);
        })
    }

    input.addEventListener('input', debounce(onInput, 500));
}