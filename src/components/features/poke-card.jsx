"use client"

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

import Link from 'next/link'


// Basic card layout for each of the Pokemon in Landing Page 1+2+SearchResults

export default function PokeCard(props) { //FORMAT THE CARDS CORRECTLY HERE
    // Holds the information about the pokemon card clicked on
    const pokemon = props.pokemon

    // Transfers the page number so it can be sent back to if the card is selected
    const pageNum = props.pageNum

    // Transfers the search query so if it is selected, the query can be returned to
    const query = props.query

    // Used to format the parameters to send the callback URL so it can return to the same page.
    const params = new URLSearchParams();
    params.set("callbackPage", pageNum);      
    if (query) {
        params.set("query", query)
    };  

    return (
        <Link href={`/details/${pokemon.name}?${params.toString()}`}>
            {/* Overflow Hidden hides the parts of the image going over the card*/}
            <Card className="overflow-hidden p-0"> 
                <img src={pokemon.imageURL} className="bg-gray-100 w-full object-contain"></img>
                <CardHeader className="">
                    <CardTitle>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</CardTitle>
                    <CardDescription>{convertPokemonID(pokemon.id)}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 mb-4">
                        {pokemon.types.map((type, index) => 
                            <Badge key={index} className="text-[0.6rem]">
                                {type[0].toUpperCase() + type.slice(1)}
                            </Badge>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
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