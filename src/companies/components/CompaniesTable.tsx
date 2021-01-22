import React from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core'
import { Company, Order, OrderBy } from '../../common/types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loading: { opacity: 0.5, transition: 'opacity 0.2s ease-out' },
  })
)

type Props = {
  companies: Company[]
  loading: boolean
  total: number
  order: Order
  orderBy: OrderBy
  onOrderChange: (orderBy: OrderBy) => void
  page: number
  rowsPerPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
}

export const CompaniesTable: React.FC<Props> = ({
  loading,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  total,
  order,
  orderBy,
  onOrderChange,
  companies,
}) => {
  const classes = useStyles()
  return (
    <Paper>
      {/* Table itself */}
      <TableContainer className={loading ? classes.loading : undefined}>
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
                <TableCell width="20%">{company.speciality}</TableCell>
                <TableCell width="20%">{company.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Table pagination */}
      <TablePagination
        className={loading ? classes.loading : undefined}
        rowsPerPageOptions={[10, 20, 30, 50]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onChangePage={(event, page) => {
          onPageChange(page + 1)
        }}
        onChangeRowsPerPage={(event) => {
          onRowsPerPageChange(parseInt(event.target.value, 10))
        }}
      />
    </Paper>
  )
}
