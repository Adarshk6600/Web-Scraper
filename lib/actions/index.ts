"use server"
import { scrapeAmazonProduct } from "../scraper";
export async function scrapeAndStoreProducts(productURL: string) {
  if (!productURL) return;
  try {
    const scrapedProduct = await scrapeAmazonProduct(productURL)
  } catch (error: any) {
    throw new Error('failed to create/update product', error.message)
  }
}