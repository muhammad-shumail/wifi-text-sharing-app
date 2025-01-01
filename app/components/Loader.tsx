import React from 'react'


const Loader = () => {
  return (
    <div className="loading flex justify-center">
      <span className="w-4 h-4 bg-gray-200 rounded-full mx-1 animate-pulse"></span>
      <span className="w-4 h-4 bg-gray-200 rounded-full mx-1 animate-pulse"></span>
      <span className="w-4 h-4 bg-gray-200 rounded-full mx-1 animate-pulse"></span>
    </div>
  )
}

export default Loader