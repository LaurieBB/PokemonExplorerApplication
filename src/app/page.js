import PokeCard from "../components/features/poke-card";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import Pagiation from "../components/layout/pagination";

import PokeLayout from "@components/features/poke-layout";
import FetchPokemon from "../api/fetchPokemon";

export default function Home() {

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Header></Header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <PokeCard name="Testing"></PokeCard>
      <PokeCard name="Testing Pokemon"></PokeCard>
      {/* <PokeLayout></PokeLayout> */}
      <FetchPokemon></FetchPokemon>
      </main>
      <Pagiation></Pagiation>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Footer></Footer>
      </footer>
    </div>
  );
}


