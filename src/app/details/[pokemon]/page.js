import Footer from "@components/layout/footer";
import Header from "@components/layout/header";

import PokeDescLayout from "@/src/components/features/poke-desc-layout";

export default async function pokeDetails({ params }) {
  const param = await params
  const pokeName = await param.pokemon

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

      <PokeDescLayout name={pokeName}></PokeDescLayout>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Footer></Footer>
      </footer>
    </div>
  )
}