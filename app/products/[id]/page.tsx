import React from 'react';
import { getProductById } from '../../../lib/actions/index';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

const ProductDetails = async ({ params: { id } }: Props) => {
  try {
    const product = await getProductById(id);

    if (!product) {
      redirect('/'); // Redirect if the product does not exist
      return null; // Prevent further rendering
    }

    return (
      <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>Price: ${product.price.toFixed(2)}</p>
      </div>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    redirect('/'); // Redirect to the homepage on error
    return null; // Prevent rendering if there's an error
  }
};

export default ProductDetails;
