import { useCallback, useState } from 'react'
import { debounce } from 'lodash'
import { useUpdateEffect } from 'react-use'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useDebounced = (value: any, timeout = 0): any => {
  const [debouncedValue, setDebouncedValue] = useState<any>(value)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateDebouncedValue = useCallback(
    debounce((value: string) => setDebouncedValue(value), timeout),
    [timeout]
  )

  useUpdateEffect(() => {
    updateDebouncedValue(value)
  }, [value])

  return debouncedValue
}
