// Header section for all pokemon explore pages

import { Separator } from "@components/ui/separator"

export default function Header() {
    return (
        <header className="flex flex-col items-center text-center w-full mt-8"> 
            <h1 className="text-5xl"><b>Pokémon Browser</b></h1>
            <h2 className="text-xl text-gray-400"><b>Search and find Pokémon</b></h2>
            <Separator className="w-full mt-15"></Separator> 
        </header>
    )
}