import React from 'react'

export default function Loading() {
  return (
    <div className=" flex flex-col container">
      <div className="flex flex-col w-full gap-3">
        <div>
          <div className="h-4 bg-muted rounded mb-2 w-24 animate-pulse"></div>
          <div className="h-10 bg-muted rounded animate-pulse"></div>
        </div>

        <div>
          <div className="h-4 bg-muted rounded mb-2 w-24 animate-pulse"></div>
          <div className="h-10 bg-muted rounded animate-pulse"></div>
        </div>

        <div>
          <div className="h-4 bg-muted rounded mb-2 w-32 animate-pulse"></div>
          <div className="h-10 bg-muted rounded animate-pulse"></div>
        </div>

        <div>
          <div className="h-4 bg-muted rounded mb-2 w-32 animate-pulse"></div>
          <div className="h-10 bg-muted rounded animate-pulse"></div>
        </div>

        <div>
          <div className="h-4 bg-muted rounded mb-2 w-32 animate-pulse"></div>
          <div className="h-10 bg-muted rounded animate-pulse"></div>
        </div>

        <div className="h-32 bg-muted rounded animate-pulse mb-3"></div>

        <div className="flex justify-center p-2">
          <div className="h-10 bg-muted rounded w-24 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
