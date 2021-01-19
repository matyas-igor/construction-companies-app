import React, { useContext, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import qs from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { useTableOrder } from '../hooks/useTableOrder'
import { CompaniesTable } from '../components/CompaniesTable'

const GET_COMPANIES = gql`
  query GetCompanies($offset: Int, $limit: Int) {
    companies(limit: $limit, offset: $offset) {
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
  const { loading, error, data, refetch } = useQuery(GET_COMPANIES, {
    variables: {
      offset: 0,
      limit: 20,
    },
  })

  const { order, orderBy, onOrderChange } = useTableOrder()

  console.log('DATA', data)

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Companies
      </Typography>
      <CompaniesTable companies={data?.companies?.nodes || []} order={order} orderBy={orderBy} onOrderChange={onOrderChange} />
    </>
  )
}
