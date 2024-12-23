import React from 'react'
import { Product } from '../types'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  product:Product
}

const ProductCards = ({ product }: Props) => {
  
  return (
    <Link href={`/products/${product._id}`} className='product-card'>
      <div className='product-card_img-container'>
        <Image
        src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className='product-card_img'
        />
      </div>
      <div className='flex flex-col gap-3'>
        <h1>{product.title}</h1>
        <div className='flex justify-between'>
          <p className='text-black opacity-60 text-lg capitalize'>{product.category}</p>
          <p className='text-black text-lg font-semibold'>
            <span> {product.currency} </span>
            <span> {product.currentPrice} </span>
          </p>
        </div>
        </div>
    </Link>
  )
}

export default ProductCards
