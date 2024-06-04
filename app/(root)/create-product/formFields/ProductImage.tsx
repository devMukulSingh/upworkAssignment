"use client";
import { FC } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/commons/ImageUpload";
import { Iform } from "../page";

const ProductImage: FC<Iform> = ({ form, disabled }) => {
  return (
    <>
      <FormField
        name="productImage"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Product Image
            </FormLabel>
            <FormControl>
              <ImageUpload
                disabled={disabled}
                image={field.value}
                onChange={(url) => field.onChange(url)}
                onRemove={() =>
                  field.onChange("")
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ProductImage;
