import React from 'react'
import { createStyles, Grid, makeStyles, TextField, Theme } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

type FilterState = {
  q: string
  cities: string[]
  specialities: string[]
}

type Props = FilterState & {
  setFilter: (values: Partial<FilterState>) => void
  citiesOptions: string[]
  specialitiesOptions: string[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: { marginBottom: theme.spacing(2) },
  })
)

export const CompaniesFilter: React.FC<Props> = ({
  q,
  cities,
  specialities,
  setFilter,
  citiesOptions,
  specialitiesOptions,
}) => {
  const classes = useStyles()
  return (
    <Grid container spacing={3} className={classes.container}>
      <Grid item xs={4}>
        <TextField
          placeholder="Search for companies…"
          variant="outlined"
          fullWidth
          onChange={(e) => setFilter({ q: e.target.value })}
          value={q}
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          multiple
          options={citiesOptions}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Cities" placeholder="Select cities…" />
          )}
          value={cities}
          onChange={(e, values: string[]) => setFilter({ cities: values })}
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          multiple
          options={specialitiesOptions}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Specialities" placeholder="Select specialities…" />
          )}
          value={specialities}
          onChange={(e, values: string[]) => setFilter({ specialities: values })}
        />
      </Grid>
    </Grid>
  )
}
