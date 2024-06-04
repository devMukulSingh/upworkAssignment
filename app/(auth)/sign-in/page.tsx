"use client";
import { Form } from "@/components/ui/form";
import { signInSchema} from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Email from "./components/Email";
import Password from "./components/Password";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useSWR from "swr";

type formValues = z.infer<typeof signInSchema>;

export interface Iform {
  form: UseFormReturn<formValues, any, undefined>;
  isLoading:boolean
}
type Targs = [
  url:string,
  args:formValues
]
async function signInUser([url,args]:Targs) {
  return await axios.get(url,{
    params:args
  });
}
const SignInPage = () => {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const form = useForm<formValues>({
    resolver: zodResolver(signInSchema),
  });
    const { isLoading} = useSWR(isFetching ? [`/api/user/signIn`,form.getValues()] : null, signInUser, {
      onError(err) {
        console.log(`Error in signInUser`, err);
        toast.error(err.response.data.error);
        setIsFetching(false);
      },
      onSuccess(data) {
        setIsFetching(false);
        localStorage.setItem('user',JSON.stringify(data.data))
        router.push("/");
      },
    });

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="border rounded-md px-5 py-10 w-[25rem] min-h-[30rem] flex flex-col gap-5">
        <h1 className="text-2xl font-semibold">SignIn</h1>
        <Form {...form}>
          <form className="space-y-5" onSubmit= { (e) => e.preventDefault()}>
            <Email isLoading={isLoading} form={form} />
            <Password isLoading={isLoading} form={form} />
            <Button 
              onClick={ () => setIsFetching(true)}
              type="submit" 
              disabled={isLoading} 
              className="w-full">
              Submit
            </Button>
          </form>
        </Form>
        <Link
          href="/sign-up"
          className="hover:underline text-sm text-neutral-500"
        >
          Already have an account? SignUp
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
