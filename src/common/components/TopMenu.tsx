import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

export const TopMenu: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Construction Explorer</Typography>
      </Toolbar>
    </AppBar>
  )
}
