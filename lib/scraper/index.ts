import axios from "axios";
import * as cheerio from 'cheerio'
import { extractCurrency, extractDescription, extractPrice } from "../utils";
import dynamic from "next/dynamic";

export async function scrapeAmazonProduct(url:string) {
  if (!url) return
  const username = String(process.env.BRIGHT_DATA_USERNAME)
  const password = String(process.env.BRIGHT_DATA_PASSWORD)
  const PORT = 22225
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session${session_id}`,
      password,
    },
    host: 'brd.superproxy.io',
    PORT,
    rejectAutharized:false
  }
  try {
    const response = await axios.get(url, options)
    const $ = cheerio.load(response.data);
    const title = $('#productTitle').text().trim();
    const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('.a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
      $('.a-price.a-text-price'),
      $('a-price .aok-align-center .reinventPricePriceToPayMargin .priceToPay'),
      $('.a-price span .a-price-whole')
    );
    const originalPrice = extractPrice(
      $('#priceBlock_ourPrice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price')
    );
    const currency = extractCurrency($('.a-price-symbol'))
    const discountPrice = $('.savingsPercentage').text().replace(/[-%]/g, '')
    const images = $('#imgBlkFront').attr('data-a-dynamic-image-image') ||
      $('#landingImage').attr('data-a-dynamic-image') || '{}'
    const imgUrls = Object.keys(JSON.parse(images));
    const description = extractDescription($)
    
    const outOfStock = $('#availability .a-declarative span .a-color-success').text().trim().toLowerCase() === 'currently unavailable'
    const data = {
      url,
      currency: currency || '₹',
      image: imgUrls[0],
      title,
      description,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountPrice: Number(discountPrice),
      category: 'category',
      reviewsCount: 100,
      stars: 4.5,
      outOfStock,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      average: Number(currentPrice) || Number(originalPrice)

    }
    console.log(data);
    
    return data

  } catch (error: any) {
    throw new Error('failed to scrape product:', error.message)
  }

}