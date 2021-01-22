import { useState } from 'react'
import qs from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'
import { useLatest, useUpdateEffect } from 'react-use'

type UseTablePaginationReturn = {
  page: number
  rowsPerPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
}

export const useTablePagination = (defaultPage = 1, defaultRowsPerPage = 20): UseTablePaginationReturn => {
  // reading order & orderBy from location params
  const history = useHistory()
  const { search } = useLocation()
  const { page: searchPage, rowsPerPage: searchRowsPerPage } = qs.parse(search)
  const searchLatest = useLatest(search)

  const [{ page, rowsPerPage }, setState] = useState<{
    page: number
    rowsPerPage: number
  }>({
    page: parseInt((searchPage as string) || '', 10) || defaultPage,
    rowsPerPage: parseInt((searchRowsPerPage as string) || '', 10) || defaultRowsPerPage,
  })

  // handle page/rows per page changing in table
  const onPageChange = (page: number) => {
    setState((state) => ({ ...state, page }))
  }
  const onRowsPerPageChange = (rowsPerPage: number) => {
    setState((state) => ({ ...state, rowsPerPage, page: 1 }))
  }

  // updating location params
  useUpdateEffect(() => {
    const params = { ...qs.parse(searchLatest.current), page, rowsPerPage }
    history.push({
      search: qs.stringify(params),
    })
  }, [page, rowsPerPage])

  return { page, rowsPerPage, onPageChange, onRowsPerPageChange }
}
