import Footer from "@components/layout/footer";
import Header from "@components/layout/header";

import { Button } from "@components/ui/button"
import Link from 'next/link'

import PokeDescLayout from "@/src/components/features/poke-desc-layout";

// import FetchPokemonDetails from "@api/fetchPokemonDetails";
import FetchPokemonDetails from "@api/fetch-pokemon-details";

export default async function pokeDetails({ params }) {
  // const pokeName = await params.pokemon
  // const pokeData = await params.query

  // if (!pokeName || !pokeData) {
  //   return <div>Loading...</div>
  // }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Header></Header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

      <PokeDescLayout name="bulbasaur"></PokeDescLayout>

      <Button>
        <Link href={"/"}>Back</Link>
      </Button>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Footer></Footer>
      </footer>
    </div>
  )
}