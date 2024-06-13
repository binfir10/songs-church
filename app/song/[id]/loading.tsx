import React from 'react'

export default function Loading() {
  return (
    <div className='flex flex-col sm:container gap-5 justify-center px-2 min-[350px]:px-8 2xl:w-9/12'>

      <div className="flex justify-between w-11/12 gap-3 max-sm:flex-col" >
        <div className="font-bold text-left text-4xl lg:text-5xl flex max-md:flex-col max-md:items-start items-center gap-3   ">
          <h1 className="w-56 h-16 bg-muted rounded-md block mb-1">
            <span className="w-44 h-6 bg-muted rounded-md block mb-1"></span>
          </h1>

          <p className="text-base no-underline">
            <span className="w-20 h-5 bg-muted rounded-md"></span>
          </p>
        </div>
        <div className="flex gap-2 flex-col md:flex-row max-w-xs">
          <span className="w-20 h-8 bg-muted rounded-md"></span>
          <span className="w-20 h-8 bg-muted rounded-md"></span>
        </div>
      </div >
      <div className="flex flex-col gap-1 my-2 ">
        <span className="text-base font-bold">
          <p className="text-base h-7 max-h-7 bg-muted">
            <span className="w-20 h-5 bg-muted rounded-md"></span>
          </p>
        </span>
        <span className="text-base font-bold">
          <p className="text-base h-7 max-h-7 bg-muted">
            <span className="w-20 h-5 bg-muted rounded-md"></span>
          </p>
        </span>
      </div>

      <div className="flex flex-col">
        <span className='w-44 h-6 bg-muted rounded-md block mb-1'></span>
        <div
          className="rounded-md p-2 w-full max-w-2xl mt-1"
        >
          <span className="w-full h-6 bg-muted rounded-md block mb-1"></span>
          <span className="w-full h-6 bg-muted rounded-md block mb-1"></span>
          <span className="w-full h-6 bg-muted rounded-md block mb-1"></span>

        </div>
      </div>

    </div>
  )
}
