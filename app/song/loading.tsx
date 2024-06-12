import React from 'react'

export default function Loading() {
  return (

    <div role="status" className="flex flex-col md:container  px-3 2xl:w-9/12 space-y-4 border border-neutral-200 divide-y divide-neutral-200 rounded shadow animate-pulse dark:divide-neutral-700 md:p-6 dark:border-neutral-700">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-2.5 bg-neutral-300 rounded-full dark:bg-neutral-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-neutral-200 rounded-full dark:bg-neutral-700"></div>
        </div>
        <div className="h-2.5 bg-neutral-300 rounded-full dark:bg-neutral-700 w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-neutral-300 rounded-full dark:bg-neutral-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-neutral-200 rounded-full dark:bg-neutral-700"></div>
        </div>
        <div className="h-2.5 bg-neutral-300 rounded-full dark:bg-neutral-700 w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-neutral-300 rounded-full dark:bg-neutral-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-neutral-200 rounded-full dark:bg-neutral-700"></div>
        </div>
        <div className="h-2.5 bg-neutral-300 rounded-full dark:bg-neutral-700 w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-neutral-300 rounded-full dark:bg-neutral-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-neutral-200 rounded-full dark:bg-neutral-700"></div>
        </div>
        <div className="h-2.5 bg-neutral-300 rounded-full dark:bg-neutral-700 w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-neutral-300 rounded-full dark:bg-neutral-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-neutral-200 rounded-full dark:bg-neutral-700"></div>
        </div>
        <div className="h-2.5 bg-neutral-300 rounded-full dark:bg-neutral-700 w-12"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>

  )
}
