import React, { useContext, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import qs from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { useTableOrder } from '../hooks/useTableOrder'
import { CompaniesTable } from '../components/CompaniesTable'
import { useTablePagination } from '../hooks/useTablePagination'
import { Error } from '../../common/components/Error'

const GET_COMPANIES = gql`
  query GetCompanies($offset: Int, $limit: Int, $sortBy: SortBy) {
    companies(limit: $limit, offset: $offset, sortBy: $sortBy) {
      limit
      offset
      total
      nodes {
        id
        name
        speciality
        logo
        city
      }
    }
  }
`

export const CompaniesIndexRoute: React.FC = () => {
  const { order, orderBy, onOrderChange } = useTableOrder()
  const { page, rowsPerPage, onPageChange, onRowsPerPageChange } = useTablePagination()

  const { loading, error, data, refetch } = useQuery(GET_COMPANIES, {
    variables: {
      offset: (page - 1) * rowsPerPage,
      limit: rowsPerPage,
      sortBy: { field: orderBy, order: order },
    },
  })

  console.log('DATA', data, 'PAGE', page, rowsPerPage, { loading, error })

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Companies
      </Typography>
      <Error error={error} onRetry={refetch} />
      <CompaniesTable
        loading={loading}
        companies={data?.companies?.nodes || []}
        total={data?.companies?.total || 0}
        order={order}
        orderBy={orderBy}
        onOrderChange={onOrderChange}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </>
  )
}
