"use server"
import { dbConnect } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import Product from "../models/product.model";
export async function scrapeAndStoreProducts(productURL: string) {
  if (!productURL) return;
  try {
    dbConnect()

    const scrapedProduct = await scrapeAmazonProduct(productURL)
    if (!scrapedProduct) return;
    let product = scrapedProduct
    const existingProduct = await Product.findOne({ url: scrapedProduct.url })
    if (existingProduct) {
      const updatedPriceHistory = [...existingProduct.priceHistory,
        {price:scrapedProduct.currentPrice}
      ]
    
    }
    
  } catch (error: any) {
    throw new Error('failed to create/update product', error.message)
  }
}