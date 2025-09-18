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
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen">
      <Header className="w-full"></Header>

      {/* Width is set here to be 70% of the original page, this is to ensure it matches the Figma as best as it can. However, may reduced device compatability */}
      <main className="flex flex-col flex-1 items-center sm:items-start m-8 w-[70%]">
        <PokeLayout className="w-full h-full" page={page} query={query}></PokeLayout>
      </main>
      <Footer className="w-full"></Footer>
    </div>
  );
}


