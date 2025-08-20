import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface BreedsData {
  [breed: string]: string[]
}

function DogListFetcher() {
  const [dogBreeds, setDogBreeds] = useState<BreedsData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDogListAxios = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/list/all')

      setDogBreeds(response.data.message)
      console.log(response.data.message)
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
      setDogBreeds(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDogListAxios()
  }, [])

  console.log(`these are the breeds ${dogBreeds}  testing`)

  return (
    <div className="text-center">
      <h1>List of Dogs(with Axios)</h1>
      {dogBreeds && !isLoading ? (
        <ul>
          {Object.entries(dogBreeds).map(([breedName, subBreedsArray]) => (
            <li key={breedName}>
              <strong>{breedName}</strong>
              {subBreedsArray.length > 0 && (
                <span>
                  <br />
                  (Sub-breeds:{' '}
                  <ul>
                    {subBreedsArray.map((subBreed) => (
                      <li key={`${breedName}-${subBreed}`}>{subBreed}</li>
                    ))}
                  </ul>
                  )
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && !error && <p>No breeds to display.</p>
      )}
    </div>
  )
}

export default DogListFetcher
