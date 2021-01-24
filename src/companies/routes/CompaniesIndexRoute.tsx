import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Typography } from '@material-ui/core'
import { useTableOrder } from '../hooks/useTableOrder'
import { CompaniesTable } from '../components/CompaniesTable'
import { useTablePagination } from '../hooks/useTablePagination'
import { Error } from '../../common/components/Error'
import { useUpdateEffect } from 'react-use'
import { useTableFilter } from '../hooks/useTableFilter'
import { CompaniesFilter } from '../components/CompaniesFilter'

const GET_INFO = gql`
  query GetInfo {
    info {
      cities
      specialities
    }
  }
`

const GET_COMPANIES = gql`
  query GetCompanies(
    $q: String
    $cities: [String]
    $specialities: [String]
    $offset: Int
    $limit: Int
    $sortBy: SortBy
  ) {
    companies(q: $q, cities: $cities, specialities: $specialities, limit: $limit, offset: $offset, sortBy: $sortBy) {
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
  const { page, rowsPerPage, onPageChange, onRowsPerPageChange } = useTablePagination()
  const { debouncedQ, q, cities, specialities, setFilter } = useTableFilter('', () => onPageChange(1))
  const { order, orderBy, onOrderChange } = useTableOrder()

  const { loading, error, data, refetch } = useQuery(GET_COMPANIES, {
    variables: {
      offset: (page - 1) * rowsPerPage,
      limit: rowsPerPage,
      sortBy: { field: orderBy, order: order },
      q: debouncedQ,
      cities,
      specialities,
    },
  })

  // loading main info data
  const {
    loading: loadingInfo,
    data: { info: { cities: citiesOptions = [], specialities: specialitiesOptions = [] } = {} } = {},
  } = useQuery(GET_INFO)

  // saving latest companies & total for better user experience
  const [latestCompanies, setLatestCompanies] = useState(data?.companies?.nodes || [])
  const [latestTotal, setLatestTotal] = useState(data?.companies?.total || 0)
  useUpdateEffect(() => {
    if (!loading) {
      setLatestCompanies(data?.companies?.nodes || [])
      setLatestTotal(data?.companies?.total || 0)
    }
  }, [data, loading])

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Companies
      </Typography>
      <Error error={error} onRetry={refetch} />
      <CompaniesFilter
        q={q}
        cities={cities}
        specialities={specialities}
        setFilter={setFilter}
        citiesOptions={citiesOptions}
        specialitiesOptions={specialitiesOptions}
      />
      <CompaniesTable
        loading={loading || loadingInfo}
        companies={latestCompanies}
        total={latestTotal}
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
