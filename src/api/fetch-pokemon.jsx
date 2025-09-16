import { getPokeAPI } from "./getPokeAPI";

export default async function FetchPokemon(page) {

    // This fetches the initial list of the pokemon, for the start up page. 
    const pokemon = await getPokeAPI("https://pokeapi.co/api/v2/pokemon/?offset=" + (page * 12) + "&limit=12");

    // Takes the rest of the information for each pokemon that was retrieved from the API above and formats it for the Landing page.
    // Have to add 1 to id as it is indexed from 0
    const pokeDataPromises = pokemon.results.map((poke) => getPokeAPI(poke.url, ""))
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
