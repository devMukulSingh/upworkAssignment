"use client";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/lib/schemas";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { getFromLocalStorage } from "@/lib/hooks/useLocalStorage";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import ProductName from "../../create-product/formFields/ProductName";
import ProductDescription from "../../create-product/formFields/ProductDescription";
import ProductImage from "../../create-product/formFields/ProductImage";
import useSWR from "swr";
import { Iproduct } from "../../components/ProductsList";

type formValues = z.infer<typeof productSchema>;

export interface Iform {
  form: UseFormReturn<formValues, any, undefined>;
  disabled: boolean;
}
interface Iarg extends formValues {
  productId: string;
}
const userData = getFromLocalStorage("user");
async function editProduct(url: string, { arg }: { arg: Iarg }) {
  return await axios.put(url, {
    ...arg,
    ...userData,
  });
}
const EditProductPage = () => {

    const { productId } = useParams();
    const { data } = useSWR(`/api/product/get-products`);
    const product = data.data.find( (product:Iproduct) => product.id===productId)
    const router = useRouter();
    const form = useForm<formValues>({
      resolver: zodResolver(productSchema),
      defaultValues: {
        productDescription:product?.description || "",
        productName:product?.name || "",
        productImage : product?.image || ""
      }
    });
  const { isMutating, trigger } = useSWRMutation(
    `/api/product/edit-product`,
    editProduct,
    {
      onSuccess() {
        toast.success("Product updated");
        router.push("/");
      },
    }
  );
  const onSubmit = async (data: formValues) => {
    try {
      await trigger({...data,productId:productId.toString()});
    } catch (e: any) {
      console.log(`Error in editProduct`, e);
      toast.error(e.response.data.error);
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex flex-col gap-5 border px-5 pt-10 rounded-md w-[25rem] min-h-[30rem]">
        <h1 className="text-2xl font-semibold">Edit product</h1>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <ProductName form={form} disabled={isMutating} />
            <ProductDescription form={form} disabled={isMutating} />
            <ProductImage form={form} disabled={isMutating} />
            <Button className="w-full mt-10">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditProductPage;
