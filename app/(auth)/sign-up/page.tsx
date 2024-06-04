'use client'
import { Form } from '@/components/ui/form';
import { signUpSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import FullName from './components/FullName';
import Email from './components/Email';
import Password from './components/Password';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import axios from 'axios';
import  useSWRMutation  from "swr/mutation";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type formValues = z.infer<typeof signUpSchema>

export interface Iform {
  form: UseFormReturn<formValues, any, undefined>;
  isMutating:boolean
}
async function createUser(url: string, { arg }: { arg: formValues }) {
  return await axios.post(url, arg);
}
const SignupPage = () => {
    const router = useRouter();
    const form = useForm<formValues>({
        resolver:zodResolver(signUpSchema)
    });
    const { trigger,isMutating } = useSWRMutation(`/api/user/signUp`, createUser,{
        onError(err){
            console.log(`Error in createUser`,err);
        },
        onSuccess(data){
            localStorage.setItem("user", JSON.stringify(data.data));
            router.push('/');
        }
    });
    const onSubmit = async(data: formValues) => { 
        try{ await trigger(data) }
        catch(e:any){
            toast.error(e.response.data.error)
            console.log(`Error in createUser`, e);
        }
        }
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="border rounded-md px-5 py-10 w-[25rem] min-h-[30rem] flex flex-col gap-5">
        <h1 className="text-2xl font-semibold">SignUP</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FullName form={form} isMutating={isMutating} />
            <Email form={form} isMutating={isMutating} />
            <Password form={form} isMutating={isMutating} />
            <Button disabled={isMutating} className="w-full">
              Submit
            </Button>
          </form>
        </Form>
        <Link
          href="/sign-in"
          className="hover:underline text-sm text-neutral-500"
        >
          Already have an account? SignIn
        </Link>
      </div>
    </div>
  );
}

export default SignupPage