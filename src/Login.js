import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';



const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  card: {
      minWidth: 275,
      margin: '0 auto'
    },
    title: {
      marginBottom: 16,
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  

class Login extends React.Component {

    
constructor(props){
    super(props);
    this.state = {name: (localStorage.login)?localStorage.login:''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    localStorage.login = this.state.name;
    this.props.history.push("chat");
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} autoComplete="off" fullwidth="true" onSubmit={this.handleSubmit}>
        
        

        <Card  className={classes.card}>
        <CardContent>
          <Typography color="textSecondary">
            Welcome
          </Typography>
          <Typography variant="headline" component="h2">
            Chan-React app
          </Typography>
          <Typography component="div">
          <TextField
          id="name"
          label="Login (required)"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange}
          margin="normal"
          required
          autoFocus={true}
        />
          </Typography>
        </CardContent>
        <CardActions>
        <Button type="submit" variant="raised" size="small" style={{marginLeft: 'auto'}}>Connexion</Button>
        </CardActions>
      </Card>
      </form>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);