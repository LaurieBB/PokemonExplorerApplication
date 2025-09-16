// Header section for all pages

import { Separator } from "@components/ui/separator"

// TODO Fix the font and the center align of the text, as well as the size

export default function Header() {
    return (
        <header> 
            <h1 className="header-1"><b>Pokémon Browser</b></h1>
            <h2 className="header-2"><b>Search and find Pokémon</b></h2>
            <Separator></Separator> 
        </header>
    )
}