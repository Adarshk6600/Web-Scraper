"use client"

import React, { FormEvent, useState } from 'react'

const Searchbar = () => {
  const isValidAmazonProductURL = (url: string) => {
    try {
      const parsedURL = new URL(url)
      const hostName = parsedURL.hostname
      if (hostName.includes('amazon.com') || hostName.includes('amazon.') || hostName.endsWith('amazon')) {
        return true
      }
    } catch (error) {
      return false
    }

    return false
  }

  const [searchPrompt, setSearchPrompt] = useState('')
  const [isloading, setIsLoading] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isValidLink = isValidAmazonProductURL(searchPrompt)
    alert(isValidLink ? 'is valid' : 'is not valid')
    if(!isValidLink) return alert('please provide a valid link')
    try {
      setIsLoading(true)


    } catch (error) {
      console.log(error);
      //scrape
      
    } finally {
      setIsLoading(false)
    }  
  }

  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
      <input type="text" placeholder='Enter product link' className='searchbar-input'
      onChange={(e)=>{setSearchPrompt(e.target.value)}}
      />
      <button type='submit' className='searchbar-btn'
        disabled={searchPrompt === ''}> 
            {isloading? 'searching...' : 'Search'}
        </button>
     </form>
  )
}

export default Searchbar
