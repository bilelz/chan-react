import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Chat from './Chat'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';


// const Home = () => (
//   <div>
//     <h2>Home</h2>
//   </div>
// )
const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

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

const BasicExample = () => (
  <Router>
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="title" color="inherit" >
              Chan-Chat
          </Typography>
            <Button component={Link} to="/" color="inherit"> Home </Button>
            {/* <Button component={Link} to="/Login" color="inherit"> Login </Button> */}
            {/* <Button component={Link} to="/chat" color="inherit"> Chat </Button> */}
            {/* <Button component={Link} to="/about" color="inherit"> About </Button> */}
            {/* <Button component={Link} to="/topics" color="inherit"> Topics </Button> */}
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs={3}>
        {/* <Paper>Topics</Paper> */}
      </Grid>
      <Grid item xs={6}>
        <Route exact path="/" component={Login} />
        <Route path="/hello" component={Home} />
        <Route path="/chat" component={Chat} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </Grid>
      <Grid item xs={3}>
        {/* <Paper>Contacts</Paper> */}
      </Grid>
      <div>


        <hr />


      </div>
    </Grid>
  </Router>
)
export default BasicExample