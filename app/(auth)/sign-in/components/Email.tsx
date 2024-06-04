import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FC } from 'react';
import { Iform } from '../page';

const Email:FC<Iform> = ({
    form,isLoading
}) => {
  return (
    <>
      <FormField
        name="email"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your email</FormLabel>
            <FormControl>
              <Input
                disabled={isLoading} 
              placeholder="mukulsingh2276@gmail.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export default Email