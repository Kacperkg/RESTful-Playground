import DogImageFetcherAxios from './randomDogImage'
import DogListFetcher from './dogList'

function App() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="h-screen sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:static sm:px-6 lg:px-8">
          <DogImageFetcherAxios />
          <DogListFetcher />
        </div>
      </div>
    </div>
  )
}

export default App
