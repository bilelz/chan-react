import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Chat from './Chat'

import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';


const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.path}/:topicId`} component={Topic} />
    <Route exact path={match.path} render={() => (
      <h3>Please select a topic.</h3>
    )} />
  </div>
)

const Chanchat = () => (
  <Router>
    <Grid container spacing={8}>
      <Grid item sm={12} >
        <AppBar position="static" fullwidth='true'>
          <Toolbar>
            {/* <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="title" color="inherit" >
              Chan-Chat
          </Typography>
            <Button component={Link} to={`${process.env.PUBLIC_URL}/`} color="inherit"> Home </Button>
            <Button component={Link} to={`${process.env.PUBLIC_URL}/chat`} color="inherit"> Chat </Button>
            <Button component={Link} to="https://github.com/bilelz/chan-react" color="inherit" target="_blank"> Github </Button>
          </Toolbar>
        </AppBar>
      </Grid>
    
      <Grid item sm={3}>
            <span>&nbsp;</span>
      </Grid>
      <Grid item sm={6}>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Login} />
        <Route path={`${process.env.PUBLIC_URL}/hello`} component={Home} />
        <Route path={`${process.env.PUBLIC_URL}/chat`} component={Chat} />
      </Grid>
      <Grid item sm={3}>
      <span>&nbsp;</span>
      </Grid>
    </Grid>
  </Router>
)
export default Chanchat