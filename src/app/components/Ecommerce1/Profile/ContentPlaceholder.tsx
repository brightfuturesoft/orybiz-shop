"use client"

import React from "react"

interface ContentPlaceholderProps {
  title: string
}

const ContentPlaceholder: React.FC<ContentPlaceholderProps> = ({ title }) => {
  return (
    <div className="max-w-4xl">
      <h2 className="text-xl font-medium text-red-500 mb-8">{title}</h2>
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600">Content for {title} will be displayed here.</p>
      </div>
    </div>
  )
}

export default ContentPlaceholder
