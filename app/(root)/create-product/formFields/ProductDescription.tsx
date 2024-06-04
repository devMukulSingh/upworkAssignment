import { FC } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Iform } from "../page";
import { Textarea } from "@/components/ui/textarea";

const ProductDescription: FC<Iform> = ({ form }) => {
  return (
    <>
      <FormField
        name="productDescription"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product description</FormLabel>
            <FormControl>
              <Textarea
                className="h-[7rem]" 
                placeholder="product description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ProductDescription;
