import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { createStyles, makeStyles, Theme, CssBaseline, Container } from '@material-ui/core'
import { CompaniesRouter } from './companies/CompaniesRouter'
import { TopMenu } from './common/components/TopMenu'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
    },
  })
)

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache: new InMemoryCache(),
})

const App: React.FC = () => {
  const classes = useStyles()
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <Router>
        <TopMenu />
        <Container className={classes.container}>
          <Switch>
            <Route path="/companies">
              <CompaniesRouter />
            </Route>
            <Route path="*">
              <Redirect to="/companies" />
            </Route>
          </Switch>
        </Container>
      </Router>
    </ApolloProvider>
  )
}

export default App
