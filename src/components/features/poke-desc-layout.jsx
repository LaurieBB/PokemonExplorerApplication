"use client"

import React from "react";
import { useState, useEffect } from "react"

import FetchPokemonDetails from "@api/fetch-pokemon-details"

import { Button } from "@components/ui/button"
import Link from 'next/link'

import {useSearchParams } from 'next/navigation';

import { Spinner } from "@components/ui/shadcn-io/spinner/index"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card"

// This is used to take the detailed Pokemon information from the API call and to arrange it in the correct format

// Pokemon details layout:
        // id: pokemon.id, 
        // name: pokemon.name,
        // imageURL: pokemon.sprites.front_default,
        // types: pokemon.types.map((pokeType) => pokeType.type.name),
        // stats: ,
        // description: pokeDataUnfiltered[0].flavor_text_entries[0].flavor_text,
        // category: (pokeDataUnfiltered[0].genera.find(item => item.language.name == "en").genus).replace("Pokémon", ""),
        // gender: - List of Booleans in the form [male, female, genderless] to show if it belongs to that class
        // weaknesses: pokeDataUnfiltered[4].flat()

export default function PokeDescLayout(props) { 
    const searchParams = useSearchParams()

    // Retrieve the page number to return to, so it displays the correct Pokemon when returning
    const callbackPage = searchParams.get('callbackPage')
    // Retrieve the query to return to, if there is one.
    const query = searchParams.get('query')
    // Generating the URL to return to, based on the query and the callback page
    const returnURL = query ? `/${callbackPage}?query=${query}` : `/${callbackPage}`

    const [pokemon, setPokemon] = useState(null)

    useEffect(() => {
        FetchPokemonDetails(props.name).then(setPokemon)
    })

    if (!pokemon) {
        return (
            <Spinner variant="circle"></Spinner>
        ) 
    }

    return (
        <div>
            <div>
                <Card> 
                    <img src={pokemon.imageURL}></img>
                    <div>
                        <CardTitle>{JSON.stringify(pokemon.name)}</CardTitle>
                        <CardTitle>{JSON.stringify(pokemon.id)}</CardTitle>
                    </div>
                </Card>
            </div>
            <Card> 
                <CardContent>
                    <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cherish-ball.png"}></img>
                    <p>{JSON.stringify(pokemon.description)}</p>
                </CardContent>
            </Card>
            <div>
                <Card> 
                    <CardContent>
                        <h1>Height</h1>
                        <p>{JSON.stringify(pokemon.height)} m</p>
                        <h1>Category</h1>
                        <p>{JSON.stringify(pokemon.category)}</p>
                        <h1>Weight</h1>
                        <p>{JSON.stringify(pokemon.weight)} kg</p>
                        <h1>Gender</h1>
                        <p>{JSON.stringify(pokemon.gender)}</p>
                    </CardContent>
                </Card>
            </div>
            <div>
                <div>
                    <Card> 
                        <CardContent>
                            <h1>Type</h1>
                            <p>{JSON.stringify(pokemon.types)} m</p>
                            <h1>Weaknesses</h1>
                            <p>{JSON.stringify(pokemon.weaknesses)}</p>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card> 
                        <CardContent>
                            <h1>Ability</h1>
                            <h2>{JSON.stringify(pokemon.abilityName)}</h2>
                            <p>{JSON.stringify(pokemon.abilityDescription)}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div>
                <Card> 
                    <CardContent>
                        <p>{JSON.stringify(pokemon.stats)}</p>
                    </CardContent>
                </Card>
            </div>

            <Button>
                <Link href={returnURL}>&#129120; Return Home</Link>
            </Button>
        </div>
    )
}
    // HAVE TO CALL API THROUGH THE ".species" to get the "flavour-text-entires" which then give the description
    // This also has a "genera" list which contains "genus" and "language" so have to ensure the genus is correct for the english language ("en")

    // To find Gender you must go through this link: https://pokeapi.co/api/v2/gender/female/, this link https://pokeapi.co/api/v2/gender/male/, this link https://pokeapi.co/api/v2/gender/genderless/
    // and search for the pokemon name. Really stupid but i guess it is what it is

    // This is the cherish ball png that is used next to the poke description "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cherish-ball.png"

    // To get weaknesses you have to use the "types" URLs and make a successive call to each type in that list and look for "double-damage" (double check)
