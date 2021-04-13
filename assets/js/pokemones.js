document.addEventListener('DOMContentLoaded', () => {
    const state = {
        pokemons: [],
        offset: 0
    };

    const ul = document.querySelector('ul.pokemons');

    document.addEventListener('click', (e) => {
        if (e.target.matches('[href="#"]')) {
            e.preventDefault();
        }

        if (e.target.matches('.more-pokemons')) {
            fetchPokemons();
        }
    })

    const fetchPokemons = () => {
        fetch('https://pokeapi.co/api/v2/pokemon/' + `?offset=${state.offset}`).then((data) => {
            return data.json();
        }).then((pokemons) => {
            addPokemons(pokemons.results);
        }).then(() => {
            state.offset += 20;
        })   

    }

    const addPokemons = (pokemons) => {
        state.pokemons = [...state.pokemons,...pokemons];
        renderPokemons();
    }

    const renderPokemons = () => {
        state.pokemons.slice(state.offset).map(pokemon => {
            const li = document.createElement("LI");
            li.classList.add("list-group-item");

            const link = document.createElement("A");
            link.classList.add("pokemon-detail", "d-flex", "justify-content-between", "align-items-center");
            link.href = pokemon.url;

            const text = document.createTextNode(pokemon.name);

            const span = document.createElement("SPAN");
            span.classList.add("badge", "badge-primary", "badge-pill");
            span.innerText = '›';

            link.appendChild(text);
            link.appendChild(span);
            li.appendChild(link);
            ul.appendChild(li);
        })
    } 

    fetchPokemons();
})