import React from 'react'
import { Button } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: theme.spacing(3),
    },
  })
)

export const Error: React.FC<{ onRetry?: () => void; error?: Error | null }> = ({ error, onRetry }) => {
  const classes = useStyles()
  return error ? (
    <Alert
      className={classes.container}
      action={
        onRetry ? (
          <Button color="inherit" size="small" onClick={onRetry}>
            Retry
          </Button>
        ) : null
      }
    >
      {error.message}
    </Alert>
  ) : null
}
