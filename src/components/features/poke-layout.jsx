import React from "react";

// THIS FILE SHOULD ONLY BE FOR ARRANGING THE POKE-CARDS, NOT FOR ANYTHING ELSE. 

import PokeCard from "./poke-card";

export default function PokeLayout(props) { //MAYBE ADD DATA HANDLING IN HERE, PASS THE WHOLE POKEMON OBJECT AS AN ARRAY AND MANAGE IT HERE????
    return (
        <div>
            <PokeCard name={props.name}></PokeCard> 
        </div>
    )
}

