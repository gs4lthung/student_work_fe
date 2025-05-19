import React from 'react'

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center w-full h-[600px] bg-white dark:bg-gray-950">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">404</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Trang không tìm thấy
        </p>
      </div>
    </div>
  )
}
