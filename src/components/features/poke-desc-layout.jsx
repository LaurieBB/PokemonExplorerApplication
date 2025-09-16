import React from "react";

// This is used to take the detailed Pokemon information from the API call and to arrange it in the correct format

export default function PokeDescLayout(props) { 
    const pokemon = props.pokeInfo

    return (
        <div>
            <p>{JSON.stringify(pokemon[0])}</p>
            <p>{JSON.stringify(pokemon[0].sprites.front_default)}</p> 
            <p>{JSON.stringify(pokemon[0].abilities[0].ability)}</p> 
            <p>{JSON.stringify(pokemon[0].types)}</p> 
            <p>{JSON.stringify(pokemon[0].stats)}</p> 
            <p>{JSON.stringify(pokemon[0].height)}</p> 
            <p>{JSON.stringify(pokemon[0].weight)}</p> 
            <p>{JSON.stringify(pokemon[0].species)}</p> 

        </div>
    )
}
    // HAVE TO CALL API THROUGH THE ".species" to get the "flavour-text-entires" which then give the description
    // This also has a "genera" list which contains "genus" and "language" so have to ensure the genus is correct for the english language ("en")

    // To find Gender you must go through this link: https://pokeapi.co/api/v2/gender/female/, this link https://pokeapi.co/api/v2/gender/male/, this link https://pokeapi.co/api/v2/gender/genderless/
    // and search for the pokemon name. Really stupid but i guess it is what it is

    // This is the cherish ball png that is used next to the poke description "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cherish-ball.png"

    // To get weaknesses you have to use the "types" URLs and make a successive call to each type in that list and look for "double-damage" (double check)
