"use client"

import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"

const Overlay = () => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [counter, setCounter] = useState<number>(0)

  useLayoutEffect(() => {
    let currentValue = 0
    let timeOutId: NodeJS.Timeout

    const updateCounter = (): void => {
      if (currentValue === 100) return

      currentValue += Math.floor(Math.random() * 10) + 1

      if (currentValue > 100) currentValue = 100

      setCounter(currentValue)
      console.log("counter", counter)

      let delay = Math.floor(Math.random() * 200) + 50

      timeOutId = setTimeout(updateCounter, delay)
    }

    updateCounter()

    let ctx = gsap.context(() => {
      gsap.to("#counterId", 0.25, {
        delay: 2.5,
        autoAlpha: 0,
      })
      gsap.to(".bar", 2.5, {
        delay: 2.5,
        height: 0,
        eas: "power4.inOut",
      })
    }, overlayRef)

    return () => {
      clearTimeout(timeOutId)
      ctx.revert()
    }
  }, [])

  return (
    <div ref={overlayRef}>
      <h1
        id="counterId"
        className="counter fixed w-full h-full flex justify-end items-end z-50 text-white"
      >
        {counter}
      </h1>

      <div id="overlayId" className="overlay z-10">
        <div className="bar w-full h-[105vh] bg-[#CB5632]"></div>
      </div>
    </div>
  )
}

export default Overlay
