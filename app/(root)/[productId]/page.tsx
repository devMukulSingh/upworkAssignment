"use client";
import useSWR from "swr";
import { Iproduct } from "../components/ProductsList";
import Image from "next/image";
import { useParams } from "next/navigation";

const SingleProductPage = () => {
  const { productId } = useParams();
  const { data, isLoading } = useSWR(`/api/product/get-products`);
  const product: Iproduct = data?.data.find(
      (product: Iproduct) => product?.id === productId
    );
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="border px-5 py-10 gap-5 items-center rounded-md flex flex-col min-h-[25rem] w-[23rem]">
        <h1 className="text-2xl font-semibold line-clamp-3">
          {product?.name}
        </h1>
        <figure className="relative w-[15rem] h-[15rem]">
          <Image
            fill
            src={product?.image}
            alt="productImage"
            className="object-contain"
          />
        </figure>
        <h1 className="text-neutral-500 line-clamp-4">
          {product?.description}
        </h1>
      </div>
    </div>
  );
};

export default SingleProductPage;
