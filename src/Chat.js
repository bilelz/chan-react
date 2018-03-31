import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MessagesList from './MessagesList'
import SendIcon from 'material-ui-icons/Send';
import ChatIcon from 'material-ui-icons/ChatBubbleOutline';
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
    menu: {
        width: 200,
    },
});


const socket = new WebSocket('ws://localhost:8080');


class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: '', 
            name: '',
            messages : [],
            login : localStorage.login
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange = msg => event => {
        this.setState({
            [msg]: event.target.value,
        });
    };

    init = ({ match }) => (
        this.setState({
            name: this.state.match.params.name
        })
    );

    initWS = (socket) =>{
        

        socket.onopen = () => {
            socket.send(JSON.stringify({
            type: "ADD_USER",
            name: localStorage.login
            }))
        }
    
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            switch (data.type) {
              case "ADD_MESSAGE":
                // dispatch(messageReceived(data.message, data.author))
                console.log("socket message", data)
                this.setState({
                    messages: this.state.messages.concat({
                        message : data.message,
                        author : data.author,
                        date : new Date().toLocaleString()
        
                    })
                })
                break
              case "ADD_USER":
                // dispatch(addUser(data.name))
                break
              case "USERS_LIST":
                // dispatch(populateUsersList(data.users))
                break
              default:
                break
            }
          }
    }
    


    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.msg);
        
        

        socket.send(JSON.stringify({
            type: "ADD_MESSAGE",
            message : this.state.msg,
            author : localStorage.login,
            date : new Date().toLocaleString()
            }))

        this.setState({
            msg: '',
        });

        // this.props.history.push("/chat/" + this.state.name);
    }

    



    render() {
        const { classes } = this.props;
        this.initWS(socket);
        return (

            <div>
                <Typography variant="display1" color="inherit">
                Hello <strong>{this.state.login}</strong>
            </Typography>
            <Typography variant="subheading" color="inherit" align="right">
            <ChatIcon /> Messages ({this.state.messages.length})
            </Typography>

                <ul id="messages-list">
                <MessagesList items={this.state.messages} login={localStorage.login} />
                </ul>
                <hr/>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    
                    <div>
                        <TextField
                            id="msg"
                            label="Your message..."
                            className={classes.textField}
                            value={this.state.msg}
                            onChange={this.handleChange('msg')}
                            margin="normal"
                        />
                        <Button type="submit" variant="raised" size="small">Send <SendIcon /> </Button>
                    </div>
                </form>
            </div>
        );
    }
}

Chat.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chat);