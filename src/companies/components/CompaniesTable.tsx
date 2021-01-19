import React from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core'
import { Company, Order, OrderBy } from '../../common/types'

type Props = {
  companies: Company[]
  order: Order
  orderBy: OrderBy
  onOrderChange: (orderBy: OrderBy) => void
}

export const CompaniesTable: React.FC<Props> = ({ order, orderBy, onOrderChange, companies }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sortDirection={orderBy === 'name' ? order : false}>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={() => onOrderChange('name')}
              >
                Company name
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'speciality' ? order : false}>
              <TableSortLabel
                active={orderBy === 'speciality'}
                direction={orderBy === 'speciality' ? order : 'asc'}
                onClick={() => onOrderChange('speciality')}
              >
                Speciality
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'city' ? order : false}>
              <TableSortLabel
                active={orderBy === 'city'}
                direction={orderBy === 'city' ? order : 'asc'}
                onClick={() => onOrderChange('city')}
              >
                City
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell width={24}>
                <img width="24" height="24" src={company.logo} alt="Logo" />
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.speciality}</TableCell>
              <TableCell>{company.city}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
