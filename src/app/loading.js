
import { Spinner } from "@components/ui/shadcn-io/spinner/index"
import Footer from "@components/layout/footer";
import Header from "@components/layout/header";
import Search from "@components/layout/search"
import Pagination from "@components/layout/pagination"
import { Suspense } from "react";

// TODO add the extra size above and below the spinner to match the actual page

export default function Loading() {
  // Add fallback UI that will be shown while the route is loading. Matches the layout of the main page.
  return (
    <div className="font-sans flex flex-col min-h-screen">
      <Header className="w-full"></Header>
      <div className="flex items-center justify-between mb-8 w-[70%] mx-auto mt-8 ">
        <h2 className="text-xl font-bold">Explore Pokémon</h2>
        < Suspense>
          <Search />
        </Suspense>
      </div>

      <main className="flex flex-col justify-center items-center text-center flex-1 mx-auto ">
        <Spinner variant="circle"></Spinner>
      </main>

      <div className="flex justify-center mt-8 w-[70%] mx-auto mb-8">
        <Pagination 
          disableBack={true}
          disableNext={true}
        />
      </div>
      <Footer className="w-full"></Footer>
    </div>
  );
 }