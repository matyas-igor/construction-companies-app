import { useState } from 'react'
import qs from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'
import { useLatest, useUpdateEffect } from 'react-use'
import { Order, OrderBy } from '../../common/types'

type UseTableOrderReturn = {
  order: Order
  orderBy: OrderBy
  onOrderChange: (orderBy: OrderBy) => void
}

export const useTableOrder = (defaultOrderBy: OrderBy = 'name', defaultOrder: Order = 'asc'): UseTableOrderReturn => {
  // reading order & orderBy from location params
  const history = useHistory()
  const { search } = useLocation()
  const { order: searchOrder, orderBy: searchOrderBy } = qs.parse(search)
  const searchLatest = useLatest(search)

  const [{ order, orderBy }, setState] = useState<{
    order: Order
    orderBy: OrderBy
  }>({ order: (searchOrder as Order) || defaultOrder, orderBy: (searchOrderBy as OrderBy) || defaultOrderBy })

  // handle order changing in table
  const onOrderChange = (by: OrderBy) => {
    if (by === orderBy) {
      setState((state) => ({ ...state, order: state.order === 'asc' ? 'desc' : 'asc' }))
    } else {
      setState((state) => ({ ...state, orderBy: by, order: 'asc' }))
    }
  }

  // updating location params
  useUpdateEffect(() => {
    const params = { ...qs.parse(searchLatest.current), order, orderBy }
    history.push({
      search: qs.stringify(params),
    })
  }, [order, orderBy])

  return { order, orderBy, onOrderChange }
}
