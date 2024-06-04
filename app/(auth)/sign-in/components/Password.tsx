'use client'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FC } from 'react';
import { Iform } from '../page';

const Password:FC<Iform> = ({
    form,isLoading
}) => {
  return (
    <>
      <FormField
        name="password"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                disabled={isLoading}
                placeholder="Enter your password"
                type="password"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export default Password