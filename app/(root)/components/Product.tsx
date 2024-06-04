import React, { FC } from 'react'
import Link from 'next/link'
import { Iproduct } from './ProductsList'
import { Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductProps{
    product:Iproduct
}

const Product:FC<ProductProps> = ({
    product
}) => {
    const handleEdit = () => {

    }
  return (
    <div
      className="border 
        rounded-md 
        px-5 py-3
        flex
        justify-between
        items-center
        gap-10
        "
    >
      <Link
        className="text-sm"
        href={{
          pathname: `/${product.id}`,
        }}
      >
        {product.name}
      </Link>
      <Link
        className='flex gap-2 items-center border rounded-md h-10 px-3 py-2' 
        href={`/edit/${product.id}`}>
        Edit
        <Edit size={15} />
      </Link>
    </div>
  );
}

export default Product 