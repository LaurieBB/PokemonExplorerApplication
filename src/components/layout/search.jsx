"use client"

import React from "react"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { useState, useEffect } from "react"

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

// This function takes the input and then adds it as a query to the URL, which can then be picked up in INSERT HERE to complete the search TODO TODO

// There are two important things to note: Regular pokemon just go up to id #1025, whereas special pokemon start at #10000 and go up to #10277. Therefore, this needs to be accounted for if searching by ID

export default function Search() {
    const [search, setSearch] = useState(null)

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    function handleClick() {
        const params = new URLSearchParams(searchParams)
        console.log(search)

        if (search) {
            params.set('query', search);
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div>
        <Input
            type="text"
            placeholder="Find Pokémon"
            defaultValue={searchParams.get('query')?.toString()}
            onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleClick}>Search</Button>
        </div>
    )
}

