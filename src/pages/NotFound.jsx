import React from 'react'

function NotFound() {
  return (
    <React.Fragment>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 lg:w-1/3 mx-auto bg-[#D6D6D695]">
          <h1 className="text-3xl text-center font-bold">404</h1>
          <p className="text-center">Page not found</p>
      
          <div className="flex items-center justify-center mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <a href="/" className="text-white">Go to Home</a>
            </button>
      
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
              <a href="/login" className="text-white">Go To Login</a>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default NotFound