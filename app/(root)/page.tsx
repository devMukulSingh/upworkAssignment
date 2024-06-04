import { PlusCircle } from "lucide-react";
import Link from "next/link";
import ProductsList from "./components/ProductsList";


export default function Home() {
  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col gap-5 border w-[25rem] h-[30rem] p-5">
        <h1 className="text-2xl font-semibold">
          Products
        </h1>
        <ProductsList/>
        <Link 
          className="flex 
          gap-3 
          hover:bg-neutral-100
          mt-auto
          px-5
          py-2
          rounded-md
          font-semibold
          items-center
          "        
          href={'/create-product'}>
          Add product
          <PlusCircle/>
        </Link>
      </div>
    </main>
  );
}
