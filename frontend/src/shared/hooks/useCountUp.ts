import { useEffect, useState } from 'react'

export function useCountUp(value: number, duration = 600) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const step = Math.max(Math.floor(duration / value), 16)

    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= value) clearInterval(timer)
    }, step)

    return () => clearInterval(timer)
  }, [value, duration])

  return count
}
