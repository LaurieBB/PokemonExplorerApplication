import Footer from "@components/layout/footer";
import Header from "@components/layout/header";
import Pagination from "@components/layout/pagination";

import PokeLayout from "@/src/components/features/poke-card-layout";
// import FetchPokemon from "../api/fetchPokemon";
import FetchPokemon from "@api/fetch-pokemon"

export default async function LandingPage({params}) {
  const { page } = await params

  const initPokemon = await FetchPokemon(page)

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Header></Header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <PokeLayout pokemon={initPokemon}></PokeLayout>
      </main>
      <Pagination></Pagination>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Footer></Footer>
      </footer>
    </div>
  );
}


