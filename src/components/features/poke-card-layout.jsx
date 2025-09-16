import React from "react";

// THIS FILE SHOULD ONLY BE FOR ARRANGING THE POKE-CARDS, NOT FOR ANYTHING ELSE. 

import PokeCard from "./poke-card";

export default function PokeCardLayout(props) { 
    const pokemon = props.pokeInfo

    // TODO Maybe come back later and change it so I am not Prop Drilling as much as use the Context instead????

    return (
        <div>
            {pokemon.map(function(poke) { 
                return(
                    <div key={poke.id}>
                        <PokeCard key={poke.id} name={poke.name} num={poke.id} imgURL={poke.sprites.front_default} types={poke.types.map((pokeType) => pokeType.type.name)}></PokeCard> 
                        {/* <p>{JSON.stringify(poke.types)}</p>
                        <p>{JSON.stringify(poke.types.map((pokeType) => pokeType.type.name))}</p> */}
                    </div>
                )})
            }
        </div>
    )
}

