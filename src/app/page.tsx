'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Bungee } from 'next/font/google'

const font = Bungee({
  subsets: ['latin'],
  weight: ['400'],
})

type Position = { x: number; y: number }
type Direction = { x: boolean; y: boolean }

const text = 'Hello'
const speed = 10
const debug = false

export default function Home() {
  const textRef = useRef<HTMLDivElement>(null)

  const [pos, setPos] = useState<Position>({ x: 0, y: 0 })
  const [dir, setDir] = useState<Direction>({ x: true, y: true })
  const [maxPos, setMaxPos] = useState<Position>({ x: 0, y: 0 })

  const handleResize = () => {
    setMaxPos({
      x: window.innerWidth,
      y: window.innerHeight,
    })
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleInterval = useCallback(() => {
    const speedX = 1 + Math.random() * 0.6
    const speedY = 1 + Math.random() * 0.6

    setPos((pos) => ({
      x: pos.x + (dir.x ? speedX : -speedX),
      y: pos.y + (dir.y ? speedY : -speedY),
    }))

    const textWidth = textRef.current?.clientWidth || 0
    const textHeight = textRef.current?.clientHeight || 0

    if (pos.x > maxPos.x - textWidth) setDir((dir) => ({ ...dir, x: false }))
    if (pos.y > maxPos.y - textHeight) setDir((dir) => ({ ...dir, y: false }))
    if (pos.x < 0) setDir((dir) => ({ ...dir, x: true }))
    if (pos.y < 0) setDir((dir) => ({ ...dir, y: true }))
  }, [pos, dir, maxPos])

  useEffect(() => {
    const interval = setInterval(handleInterval, speed)

    return () => clearInterval(interval)
  }, [handleInterval])

  return (
    <>
      {debug && (
        <div style={{ position: 'fixed', bottom: 8, right: 8 }}>
          <div>x: {pos.x}</div>
          <div>y: {pos.y}</div>
          <div>maxX: {maxPos.x}</div>
          <div>maxY: {maxPos.y}</div>
          <div>directionX: {`${dir.x}`}</div>
          <div>directionY: {`${dir.y}`}</div>
        </div>
      )}
      <h1
        ref={textRef}
        style={{
          position: 'absolute',
          left: pos.x,
          top: pos.y,
          whiteSpace: 'nowrap',
          margin: 0,
          fontSize: 64,
          color: '#5A9CD5',
          fontWeight: 400,
          pointerEvents: 'none',
          ...font.style,
        }}
      >
        {text}
      </h1>
    </>
  )
}
