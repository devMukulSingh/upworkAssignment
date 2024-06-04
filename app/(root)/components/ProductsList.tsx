'use client'
import React, { FC } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import { getFromLocalStorage } from '@/lib/hooks/useLocalStorage'
import Product from './Product'

interface ProductsListProps {}

export interface Iproduct {
  id: string;
  name: string;
  description: string;
  image: string;
  userId: string[];
  createdAt: Date;
  updatedAt: Date;
}

const userData = getFromLocalStorage('user');

async function getProducts( url:string){
  return await axios.get(url, {
    params: {
      userId:userData.id
    }
  });
}

const ProductsList:FC<ProductsListProps> = ({

}) => {
  const { data,isLoading } = useSWR(`/api/product/get-products`,getProducts)

  return (
    <div className="flex flex-col gap-5 p-5 rounded-md overflow-auto h-[25rem]">
      {data?.data.map((product: Iproduct, index: number) => (
        <Product product={product} key={index} />
      ))}
    </div>
  );
}

export default ProductsList