const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonName = document.querySelector('.pokemon_name')
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const inputSearch = document.querySelector('.input_search')

const prev = document.querySelector('.btn-prev')
const next = document.querySelector('.btn-next')

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(response.status === 200) {
        const data = await response.json()
        return data
    }  
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML= 'Loading...'
    pokemonNumber.innerHTML = ''
    prevButtonDisabled()
    const data = await fetchPokemon(pokemon)
    if (data) {
        pokemonName.innerHTML= data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.style.display = 'block'
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        
        inputSearch.value = ''
        searchPokemon = data.id
    } else {
        pokemonName.innerHTML= 'Not Found'
        pokemonImage.style.display = 'none'
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(inputSearch.value.toLowerCase())
})

prev.addEventListener('click', () => {
    renderPokemon(searchPokemon-=1)
})

next.addEventListener('click', () => {
    renderPokemon(searchPokemon+=1)
})

const prevButtonDisabled = () => {
    if(searchPokemon > 1) {
        prev.disabled = false
    } else {
        prev.disabled = true

    }
}

renderPokemon(searchPokemon)
