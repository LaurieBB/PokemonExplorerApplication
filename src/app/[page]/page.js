import PokeCard from "@components/features/poke-card";
import Footer from "@components/layout/footer";
import Header from "@components/layout/header";
import Pagination from "@components/layout/pagination";

import PokeLayout from "@/src/components/features/poke-card-layout";

export default async function LandingPage({params, searchParams}) {
  // I have to pass the page number from the URL, so the layout will render the correct pokemon
  const param = await params
  const page = await param.page

  // This is where the query from the search is collected, if present
  const searchParam = await searchParams
  const query = searchParam?.query || null

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Header></Header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <PokeLayout page={page} query={query}></PokeLayout>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Footer></Footer>
      </footer>
    </div>
  );
}


