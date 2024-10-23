"use server"
import { dbConnect } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import Product from "../models/product.model";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { revalidatePath } from "next/cache";

export async function scrapeAndStoreProducts(productURL: string) {
  if (!productURL) return;
  try {
    await dbConnect();  // Await the database connection

    const scrapedProduct = await scrapeAmazonProduct(productURL);
    if (!scrapedProduct) return;

    let product = scrapedProduct;
    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...(existingProduct.priceHistory || []),
        { price: scrapedProduct.currentPrice }
      ];
      
      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory)
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );

    revalidatePath(`/products/${newProduct._id}`);

  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}
