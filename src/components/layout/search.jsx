"use client"

import React from "react"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { useState, useEffect } from "react"

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

// This function takes the input and then adds it as a query to the URL, which can then be picked up in the landing page and sent to "poke-card-layout" to handle the search
export default function Search() {
    const [search, setSearch] = useState(null)

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    function handleSubmit(e) {
        e.preventDefault() // This has to be used to stop a full page reload each time the form submits.

        // This section is used to load the query and add it to the URL, so it can be handled elsewhere.
        const params = new URLSearchParams(searchParams)

        if (search) {
            params.set('query', search);
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Input
                    type="text"
                    placeholder="Find Pokémon"
                    defaultValue={searchParams.get('query')?.toString()}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button type="submit">Search</Button>
            </form>
        </div>
    )
}

