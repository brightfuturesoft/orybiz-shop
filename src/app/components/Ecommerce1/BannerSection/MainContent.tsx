'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useWorkspaceStore } from '@/store/workspaceStore'
import { useBannerStore } from '@/store/useBannerStore'

const MainContent = () => {
  const workspace = useWorkspaceStore((state) => state.workspace)
  const { banners, fetchBanners } = useBannerStore()
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartX = useRef(0)
  const isDragging = useRef(false)

  // Fetch banners when workspace is ready
  useEffect(() => {
    if (workspace?._id) fetchBanners(workspace._id)
  }, [workspace, fetchBanners])

  // Auto-slide
  useEffect(() => {
    if (!banners || banners.length === 0) return
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [banners])

  const handleSwipe = (distance: number) => {
    if (!banners || banners.length === 0) return
    if (distance > 50) {
      setActiveIndex((current) => (current - 1 + banners.length) % banners.length)
    } else if (distance < -50) {
      setActiveIndex((current) => (current + 1) % banners.length)
    }
  }

  if (!banners || banners.length === 0) return null // Nothing to show

  const banner = banners[activeIndex]

  return (
    <div
      className="
        relative w-full 
        h-[200px] xs:h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] 
        overflow-hidden cursor-grab rounded-lg
      "
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => handleSwipe(e.changedTouches[0].clientX - touchStartX.current)}
      onMouseDown={(e) => {
        isDragging.current = true
        touchStartX.current = e.clientX
      }}
      onMouseUp={(e) => {
        if (!isDragging.current) return
        isDragging.current = false
        handleSwipe(e.clientX - touchStartX.current)
      }}
      onMouseLeave={(e) => {
        if (!isDragging.current) return
        isDragging.current = false
        handleSwipe(e.clientX - touchStartX.current)
      }}
    >
      <Image
        src={banner?.image_url}
        alt={`Banner ${activeIndex + 1}`}
        fill
        priority
        className="object-cover transition-all duration-500"
      />

      {/* gradient overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

      {/* indicators */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeIndex === index
                ? 'bg-red-500 w-4 sm:w-6'
                : 'bg-white/70 hover:bg-red-400'
            }`}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default MainContent
