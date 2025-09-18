import { getPokeAPI } from "./get-poke-api";

export default async function FetchPokemonDetails(name) {

    // This fetches the main list of information about the pokemon
    const pokemon = await getPokeAPI("https://pokeapi.co/api/v2/pokemon/", name);

    // Taking all the additional data about the pokemon, needed for the details page, from all the different links shown in the first API fetch
    const pokeDataUnfiltered = await Promise.all([
                                    getPokeAPI(pokemon.species.url, ""), // This URL holds data for the Description and Category
                                    getPokeAPI("https://pokeapi.co/api/v2/gender/","female/"), // Holds list of all female pokemon
                                    getPokeAPI("https://pokeapi.co/api/v2/gender/","male/"), // List of all male pokemon
                                    getPokeAPI("https://pokeapi.co/api/v2/gender/","genderless/"), // List of genderless pokemon
                                    Promise.all(pokemon.types.map((typeDesc) => getPokeAPI(typeDesc.type.url, ""))), // Calls the URL of each Pokemon type and returns it (to find weaknesses)
                                    getPokeAPI(pokemon.abilities[0].ability.url, "") // List of different Ability Descriptions from different pokemon versions
                                ])
    
    // Find in the pokemon type data, only the types that are a weakness of this pokemon
    const weaknesses = pokeDataUnfiltered[4].map((data) => data.damage_relations.double_damage_from.map((item) => item.name))

    // Have to find the matching ability description shown in Figma from this list returned by the API, which comes from the "sun-moon" version of Pokemon
    const abilityDescription = pokeDataUnfiltered[5].flavor_text_entries.find(item => item.language.name == "en" && item.version_group.name == "sun-moon")

    // Return a list containing: [male, female, genderless] which indicates the gender of the pokemon
    const genderList = [pokeDataUnfiltered[1].pokemon_species_details.find(item => item.pokemon_species.name == name), 
                        pokeDataUnfiltered[2].pokemon_species_details.find(item => item.pokemon_species.name == name), 
                        pokeDataUnfiltered[3].pokemon_species_details.find(item => item.pokemon_species.name == name)].map((item, index) => {
                            if (item) {
                                if (index == 0) return "Male";
                                if (index == 1) return "Female";
                                if (index == 2) return "Genderless";
                            }
                            }).filter(Boolean)

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
        category: (pokeDataUnfiltered[0].genera.find(item => item.language.name == "en").genus).replace(" Pokémon", ""), // This finds the category of the pokemon, e.g. Bulbasaur is "Seed"
        gender: genderList,
        weaknesses: weaknesses.flat()
    }

    return (
        pokeData
    );
}

// My original notes of how to find the data: 

// Have to call the API through the ".species" to get the "flavour-text-entires" which then give the description
// This also has a "genera" list which contains "genus" and "language" so have to ensure the genus is correct for the english language ("en")

// To find Gender you must go through this link: https://pokeapi.co/api/v2/gender/female/, this link https://pokeapi.co/api/v2/gender/male/, this link https://pokeapi.co/api/v2/gender/genderless/
// and search for the pokemon name. 

// This is the cherish ball png that is used next to the poke description "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cherish-ball.png"

// To get weaknesses you have to use the "types" URLs and make a successive call to each type in that list and look for "double-damage" (double check)