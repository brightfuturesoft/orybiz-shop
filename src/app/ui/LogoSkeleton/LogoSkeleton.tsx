'use client';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function Skeleton({ width = 100, height = 20, className = "" }: SkeletonProps) {
  return (
    <div
      className={`bg-gray-200 animate-pulse rounded ${className}`}
      style={{ width, height }}
    />
  );
}
