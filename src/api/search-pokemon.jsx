import { getPokeAPI } from "./get-poke-api";

// Function to search for the pokemon matching the "query" input, and return a list of all possible candidates in this format:
// "pokeData" layout - A List of pokemon containing:
//      id: pokemon.id - ID Integer
//      name: pokemon.name - Name String
//      imageURL: pokemon.sprites.front_default - Sprite URL
//      types: pokemon.types - List of types


export default async function SearchPokemon(search) {

    // Fetch a list of all the pokemon from the API, so I can then search for the name in the list.
    const pokemon = await getPokeAPI("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100000");

    // Search the list of all the names to find any matches 
    const pokeNames = pokemon.results.map((poke) => poke.name)
    const matchPoke = pokemon.results.filter((poke) => poke.name.toLowerCase().startsWith(search.toLowerCase()));

    // Take the full information to display the PokeCards 
    const pokeDataPromises = matchPoke.map((poke) => getPokeAPI(poke.url, ""))
    const pokeDataUnfiltered = await Promise.all(pokeDataPromises)

    const pokeData = pokeDataUnfiltered.map((poke) => {
        return {
            id: poke.id, 
            name: poke.name,
            imageURL: poke.sprites.front_default,
            types: poke.types.map((pokeType) => pokeType.type.name)
        }
    })

    return (
        pokeData
    );
}