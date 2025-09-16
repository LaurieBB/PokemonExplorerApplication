import React from "react";

import PokeCard from "./poke-card";

import Search from "@components/layout/search"

export default function PokeCardLayout(props) { 
    const pokemon = props.pokemon

    // TODO Maybe come back later and change it so I am not Prop Drilling as much as use the Context instead????

    return (
        <div>
            <h2>Explore Pokemon</h2>
            <Search></Search>
            {pokemon.map(function(poke) { 
                return(
                    <div key={poke.id}>
                        <PokeCard key={poke.id} name={poke.name} num={poke.id} imgURL={poke.imageURL} types={poke.types}></PokeCard> 
                        {/* <p>{JSON.stringify(poke.types)}</p>
                        <p>{JSON.stringify(poke.types.map((pokeType) => pokeType.type.name))}</p> */}
                    </div>
                )})
            }
        </div>
    )
}

