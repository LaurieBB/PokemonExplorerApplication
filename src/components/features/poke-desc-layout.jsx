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

import { Badge } from "@components/ui/badge"

import { Progress } from "@components/ui/progress";

// This is used to take the detailed Pokemon information from the API call and to arrange it in the correct format

// Pokemon details layout as a dictionary:
        // id: Pokemon ID
        // name: Pokemon Name
        // imageURL: Pokemon Image URL 
        // types: List of Pokemon Types
        // weight: Pokemon Weight (Has to be divided 10 to show KG)
        // height: Pokemon Height (Has to be divided 10 to show meters)
        // stats: List of the Stats in the form [["HP", _val_], ["Attack", _val_]....]
        // abilityName: The name of that Pokemon's ability
        // abilityDescription: The description of the Ability (called the "flavor-text" in the API)
        // description: Pokemon Description (again "flavor-text" in API)
        // category: This finds the category of the pokemon, e.g. Bulbasaur is "Seed"
        // gender: A list of the Genders of the Pokemon out of [male, female, genderless]
        // weaknesses: The type weaknesses of the pokemon

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
            <div className="flex flex-col w-full h-full flex-1">
                <main className="flex flex-col justify-center items-center text-center flex-1 w-full ">
                    <Spinner variant="circle"></Spinner>
                </main>
            </div>
        ) 
    }

    // TODO SEE IF I CAN GET THE CORRECT WEAKNESSES
    return (
        <div>
            <div className="flex flex-col items-center text-center w-full mb-8 gap-2 relative">
                <img src={pokemon.imageURL} className="rounded-full bg-gray-100 w-40 -mt-18"></img>
                <div className="flex gap-2 text-xl font-bold">
                    <h1>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h1>
                    <h1 className="text-gray-400">{convertPokemonID(pokemon.id)}</h1> 
                </div>
            </div>

            {/* Card with the description */}
            <Card className="bg-gray-100 mb-4 w-full"> 
                <CardContent className="flex gap-3 text-xs items-center">
                    <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cherish-ball.png"} 
                        className="rounded-full bg-white object-contain w-15"/>
                    <p className="text-left">{pokemon.description.replaceAll("\n", " ").replaceAll("\f", " ")}</p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-3 grid-rows-2 gap-4">
                {/* Card containing the height, weight, category and gender */}
                <Card className="row-span-2"> 
                    <CardContent className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-base font-bold">Height</h1>
                            <p className="text-sm">{pokemon.height / 10} m</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-base font-bold">Category</h1>
                            <p className="text-sm">{pokemon.category}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-base font-bold">Weight</h1>
                            <p className="text-sm">{pokemon.weight / 10} kg</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-base font-bold">Gender</h1>
                            <p>{pokemon.gender.map((item, index) => {
                                if(pokemon.gender[index+1]) return item + "/"
                                else return item
                                })}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Card containing types and weakenesses */}
                <Card className="col-span-1 row-span-1">
                    <CardContent className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                           <h1 className="text-base font-bold">Type</h1>
                            <div className="flex gap-2">
                                {pokemon.types.map((type, index) => 
                                    <Badge key={index} className="text-[0.6rem]">
                                        {type[0].toUpperCase() + type.slice(1)}
                                    </Badge>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-base font-bold">Weaknesses</h1>
                            <div className="flex gap-2">
                                {pokemon.weaknesses.map((type, index) => 
                                    <Badge key={index} className="text-[0.6rem]">
                                        {type[0].toUpperCase() + type.slice(1)}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                {/* Card with the Ability */}
                <Card className="col-span-1 row-span-1"> 
                    <CardContent className="flex flex-col gap-2">
                        <h1 className="text-base font-bold">Ability</h1>
                        <div>
                            <h2 className="text-sm">{pokemon.abilityName[0].toUpperCase() + pokemon.abilityName.slice(1)}</h2>
                            <p className="italic text-sm">{pokemon.abilityDescription.replaceAll("\n", " ").replaceAll("\f", " ")}</p> 
                        </div>
                    </CardContent>
                </Card>

                {/* Card with the stats */}
                <Card className="col-span-2 row-span-1"> 
                    <CardContent>
                        <div className="grid grid-cols-3 grid-rows-6 items-center gap-y-2">
                            {/* HP */}
                            <p className="font-bold col-span-1 text-left justify-self-start">HP</p>
                            <Progress className="col-span-2 h-3" value={pokemon.stats[0][1]}></Progress> 
                            {/* Attack */}
                            <p className="font-bold col-span-1 text-left justify-self-start">Attack</p>
                            <Progress className="col-span-2 h-3" value={pokemon.stats[1][1]}></Progress> 
                            {/* Defense */}
                            <p className="font-bold col-span-1 text-left justify-self-start">Defense</p>
                            <Progress className="col-span-2 h-3" value={pokemon.stats[2][1]}></Progress> 
                            {/* Special Attack */}
                            <p className="font-bold col-span-1 text-left justify-self-start">Special Attack</p>
                            <Progress className="col-span-2 h-3" value={pokemon.stats[3][1]}></Progress> 
                            {/* Special Defense */}
                            <p className="font-bold col-span-1 text-left justify-self-start">Special Defense</p>
                            <Progress className="col-span-2 h-3" value={pokemon.stats[4][1]}></Progress> 
                            {/* Speed */}
                            <p className="font-bold col-span-1 text-left justify-self-start">Speed</p>
                            <Progress className="col-span-2 h-3" value={pokemon.stats[5][1]}></Progress> 
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <Button className="mt-8">
                <Link href={returnURL}>&#129120; Return Home</Link>
            </Button>
        </div>
    )
}

// Basic helper function to convert the ID into the #0000 format needed
function convertPokemonID (id) {
    if (String(id).length == 1) {
        return "#000" + id
    } 
    else if (String(id).length == 2) {
        return "#00" + id
    }
    else if (String(id).length == 3) {
        return "#0" + id
    }
    else {
        return "#" + id
    }
}

// TODO REMOVE THIS
    // HAVE TO CALL API THROUGH THE ".species" to get the "flavour-text-entires" which then give the description
    // This also has a "genera" list which contains "genus" and "language" so have to ensure the genus is correct for the english language ("en")

    // To find Gender you must go through this link: https://pokeapi.co/api/v2/gender/female/, this link https://pokeapi.co/api/v2/gender/male/, this link https://pokeapi.co/api/v2/gender/genderless/
    // and search for the pokemon name. Really stupid but i guess it is what it is

    // This is the cherish ball png that is used next to the poke description "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cherish-ball.png"

    // To get weaknesses you have to use the "types" URLs and make a successive call to each type in that list and look for "double-damage" (double check)
