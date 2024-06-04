"use client";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/lib/schemas";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import ProductName from "./formFields/ProductName";
import ProductDescription from "./formFields/ProductDescription";
import ProductImage from "./formFields/ProductImage";
import { Button } from "@/components/ui/button";
import { getFromLocalStorage } from "@/lib/hooks/useLocalStorage";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type formValues = z.infer<typeof productSchema>;

export interface Iform {
  form: UseFormReturn<formValues, any, undefined>;
  disabled: boolean;
}
const userData = getFromLocalStorage("user");
async function createProduct(url: string, { arg }: { arg: formValues }) {
  return await axios.post(url, {
    ...arg,
    ...userData,
  });
}
const CreateProductPage = () => {
  const router = useRouter();
  const form = useForm<formValues>({
    resolver: zodResolver(productSchema),
  });
  const { isMutating, trigger } = useSWRMutation(
    `/api/product/add-product`,
    createProduct,
    {
      onSuccess() {
        toast.success("Product created");
        router.push('/');
      },
    }
  );
  const onSubmit = async (data: formValues) => {
    try {
      await trigger(data);
    } catch (e:any) {
      console.log(`Error in createProduct`, e);
      toast.error(e.response.data.error);
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex flex-col gap-5 border px-5 pt-10 rounded-md w-[25rem] min-h-[30rem]">
        <h1 className="text-2xl font-semibold">Create product</h1>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <ProductName form={form} disabled={isMutating} />
            <ProductDescription form={form} disabled={isMutating} />
            <ProductImage form={form} disabled={isMutating} />
            <Button className="w-full mt-10">Create</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateProductPage;
