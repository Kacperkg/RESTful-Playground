import React, { useState, useEffect } from 'react'
import axios from 'axios'

function DogImageFetcherAxios() {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRandomDogImage = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get(
        'https://dog.ceo/api/breeds/image/random/3'
      )

      setImageUrls(response.data.message)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error(
          'Failed to fetch dog image (HTTP error):',
          err.response.status,
          err.response.data
        )
        setError(
          `Failed to load dog image. Server responded with: ${err.response.status}`
        )
      } else {
        console.error('Failed to fetch dog image:', err)
        setError(
          'Failed to load dog image. Please check your internet connection.'
        )
      }
      setImageUrls([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomDogImage()
  }, [])

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1>Random Dog Image (with Axios)</h1>
      {isLoading && <p>Loading cute doggo...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageUrls.length > 0 && !isLoading
        ? imageUrls.map((url, index) => (
            <div key={url} style={{ flex: '0 0 auto', maxWidth: '300px' }}>
              <img
                src={url}
                alt={`Random Dog ${index + 1}`}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
              />
            </div>
          ))
        : !isLoading && !error && <p>No images to display.</p>}
      <button
        onClick={fetchRandomDogImage}
        disabled={isLoading}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          opacity: isLoading ? 0.7 : 1
        }}
      >
        {isLoading ? 'Fetching...' : 'Get Another Dog'}
      </button>
    </div>
  )
}

export default DogImageFetcherAxios
