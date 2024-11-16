import React from 'react';
import Product from '../../../lib/models/product.model';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

const ProductDetails = async ({ params: { id } }: Props) => {
  try {
    const product = await Product.findOne({ _id: id });
    console.log(product);
    

    if (!product) {
      redirect('/'); // Redirect if the product does not exist
    }

    return (
      <div>
        <h1>{product.title}</h1>
        <br />
        <p>{product.description}</p>
        <br />
        <p>Price: ${product.currentPrice}</p>
      </div>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    redirect('/'); // Redirect to the homepage on error
    return null; // Prevent rendering if there's an error
  }
};

export default ProductDetails;
