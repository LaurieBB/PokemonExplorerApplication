// There are two important things to note: Regular pokemon just go up to id #1025, whereas special pokemon start at #10000 and go up to #10277. Therefore, this needs to be accounted for if searching by ID
"use client"

import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"

export default function Search() {
    return (
        <div>
            <Input placeHolder="Find Pokémon"></Input>
            <Button>Search</Button>
        </div>
    )
}