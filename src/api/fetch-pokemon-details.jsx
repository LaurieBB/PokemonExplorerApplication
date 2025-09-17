import { getPokeAPI } from "./get-poke-api";

export default async function FetchPokemonDetails(name) {

    // This fetches the initial list of the pokemon, for the start up page. 
    const pokemon = await getPokeAPI("https://pokeapi.co/api/v2/pokemon/", name);

    // Taking all the data about the pokemon, needed for the details page, from all the different links 
    const pokeDataUnfiltered = await Promise.all([
                                    getPokeAPI(pokemon.species.url, ""), // This URL holds data for the Description and Category
                                    getPokeAPI("https://pokeapi.co/api/v2/gender/","female/"), // Holds list of all female pokemon
                                    getPokeAPI("https://pokeapi.co/api/v2/gender/","male/"), // List of all male pokemon
                                    getPokeAPI("https://pokeapi.co/api/v2/gender/","genderless/"), // List of genderless pokemon
                                    Promise.all(pokemon.types.map((typeDesc) => getPokeAPI(typeDesc.type.url, ""))), // Searches through all types to find the weaknesses of each type
                                    getPokeAPI(pokemon.abilities[0].ability.url, "") // List of different Ability Descriptions from different pokemon versions
                                ])
    
    // Find in the type data, only the types that are a weakness of this pokemon
    const weaknesses = pokeDataUnfiltered[4].map((data) => data.damage_relations.double_damage_from.map((item) => item.name))

    // Have to find the matching ability description shown in Figma from this list returned by the API, which comes from the "sun-moon" version of Pokemon
    const abilityDescription = pokeDataUnfiltered[5].flavor_text_entries.find(item => item.language.name == "en" && item.version_group.name == "sun-moon")

    // Return a list of [male, female, genderless] which shows Boolean values of which gender this pokemon has
    const genderList = [pokeDataUnfiltered[1].pokemon_species_details.find(item => item.pokemon_species.name == name), 
                        pokeDataUnfiltered[2].pokemon_species_details.find(item => item.pokemon_species.name == name), 
                        pokeDataUnfiltered[3].pokemon_species_details.find(item => item.pokemon_species.name == name)].map((item) => item ? true:false)

    // Dictionary of statistics about the pokemon, to be displayed in bar form, as per Figma
    const stats = pokemon.stats.map((stat) => [stat.stat.name, stat.base_stat])
    
    const pokeData = {
        id: pokemon.id, 
        name: pokemon.name,
        imageURL: pokemon.sprites.front_default,
        types: pokemon.types.map((pokeType) => pokeType.type.name),
        weight: pokemon.weight,
        height: pokemon.height,
        stats: stats,
        abilityName: pokemon.abilities[0].ability.name,
        abilityDescription: abilityDescription.flavor_text,
        description: pokeDataUnfiltered[0].flavor_text_entries[0].flavor_text,
        category: (pokeDataUnfiltered[0].genera.find(item => item.language.name == "en").genus).replace(" Pokémon", ""),
        gender: genderList,
        weaknesses: weaknesses.flat()
    }

    return (
        pokeData
    );
}