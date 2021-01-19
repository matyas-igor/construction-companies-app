import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CompaniesIndexRoute } from './routes/CompaniesIndexRoute'

export const CompaniesRouter: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/companies">
        <CompaniesIndexRoute />
      </Route>
      <Route path="*">
        <Redirect to="/companies" />
      </Route>
    </Switch>
  )
}
