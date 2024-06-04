import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FC } from 'react';
import { Iform } from '../page';

const FullName:FC<Iform> = ({
    form
}) => {
  return (
    <>
      <FormField
        name="fullName"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full name</FormLabel>
            <FormControl>
              <Input placeholder="Mukul singh" {...field} />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
    </>
  );
}

export default FullName