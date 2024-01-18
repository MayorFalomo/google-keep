import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return() => clearTimeout(timeOut)
  }, [value])
  
  return debouncedValue
};
