
import { Spinner } from "@components/ui/shadcn-io/spinner/index"
import Footer from "@components/layout/footer";
import Header from "@components/layout/header";

// TODO ENSURE THE STYLING IS CORRECT HERE AS WELL
// TODO add the extra size above and below the spinner to match the actual page

export default function Loading() {
  // Add fallback UI that will be shown while the route is loading.
  return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <Header></Header>
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Spinner variant="circle"></Spinner>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <Footer></Footer>
        </footer>
      </div>
    );
 }