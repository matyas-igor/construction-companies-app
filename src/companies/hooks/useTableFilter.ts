import { useState } from 'react'
import qs from 'query-string'
import { castArray } from 'lodash'
import { useHistory, useLocation } from 'react-router-dom'
import { useLatest, useUpdateEffect } from 'react-use'
import { useDebounced } from '../../common/hooks/useDebounced'

type State = {
  q: string
  cities: string[]
  specialities: string[]
}

type UseTableFilterReturn = State & {
  debouncedQ: string
  setFilter: (values: Partial<State>) => void
}

export const useTableFilter = (defaultQuery = '', onFilterChange: () => void): UseTableFilterReturn => {
  // reading order & orderBy from location params
  const history = useHistory()
  const { search } = useLocation()
  const { q: searchQuery, cities: searchCities, specialities: searchSpecialities } = qs.parse(search)
  const searchLatest = useLatest(search)
  const onFilterChangeLatest = useLatest(onFilterChange)

  const [{ q, cities, specialities }, setState] = useState<State>({
    q: (searchQuery as string) || defaultQuery,
    cities: searchCities ? castArray(searchCities) : [],
    specialities: searchSpecialities ? castArray(searchSpecialities) : [],
  })

  // debouncing search param update
  const debouncedQ = useDebounced(q, 250)

  // updating location params
  useUpdateEffect(() => {
    onFilterChangeLatest.current?.()
    const params = { ...qs.parse(searchLatest.current), q: debouncedQ, cities, specialities }
    history.push({
      search: qs.stringify(params),
    })
  }, [debouncedQ, cities, specialities])

  const setFilter = (values: Partial<State>) => {
    setState((state) => ({ ...state, ...values }))
  }

  return { debouncedQ, q, cities, specialities, setFilter }
}
