import Footer from "@components/layout/footer";
import Header from "@components/layout/header";

import PokeDescLayout from "@/src/components/features/poke-desc-layout";

export default async function pokeDetails({ params }) {
  const param = await params
  const pokeName = await param.pokemon

  return (

    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen  sm:pb-20">
      <header className="bg-neutral-400 w-full pb-30">
        <h1 className="bg-white w-full p-3 font-bold pl-12">Pokémon Browser</h1>
      </header>
      
      {/* Width is set here to be 70% of the original page, this is to ensure it matches the Figma as best as it can. However, may reduced device compatability */}
      <main className="flex flex-col items-center sm:items-start m-8 w-[70%]">
        <PokeDescLayout className="w-full" name={pokeName}></PokeDescLayout>
      </main>
      <Footer className="w-full"></Footer>
    </div>

  )
}