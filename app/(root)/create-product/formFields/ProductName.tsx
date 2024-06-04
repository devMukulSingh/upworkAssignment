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

const ProductName: FC<Iform> = ({ form, disabled }) => {
  return (
    <>
      <FormField
        name="productName"
        control={form.control}
        render={({ field }) => (
          <FormItem>
                <FormLabel>
              Product name
            </FormLabel>
            <FormControl>
              <Input placeholder="product name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ProductName;
