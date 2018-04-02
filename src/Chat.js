import React from 'react';
import { withStyles } from 'material-ui/styles';
import MessagesList from './MessagesList'
import ChatIcon from 'material-ui-icons/ChatBubbleOutline';
import Typography from 'material-ui/Typography';
import 'emoji-mart/css/emoji-mart.css'
import Badge from 'material-ui/Badge';


import MessageForm from './MessageForm'


const socket = new WebSocket('ws://78.122.107.119:8080');
// const socket = new WebSocket('ws://192.168.1.55:8080');
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        float: 'right'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    }
});




class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            name: '',
            messages: [],
            login: localStorage.login,
            showEmojiPicker: false,
            isWebsocketConnected: false,
            WebSocketMessage: 'Connecting...'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange = event => {
        this.setState({
            msg: event.target.value,
        });
    };

    updateMsg = _msg => {
        this.setState({
            msg: this.state.msg + _msg
        });
    }

    init = ({ match }) => (
        this.setState({
            name: this.state.match.params.name
        })
    );

    initWS = (socket) => {
        // this.setState({
        //     WebSocketMessage: 'Connecting...'
        // })

        socket.onopen = () => {
            
            this.setState({
                isWebsocketConnected: true,
                WebSocketMessage: 'Connected'
            })

            socket.send(JSON.stringify({
                type: "ADD_USER",
                name: localStorage.login
            }))

        }

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            switch (data.type) {
                case "ADD_MESSAGE":
                    this.setState({
                        messages: this.state.messages.concat({
                            message: data.message,
                            author: data.author,
                            date: new Date().toLocaleString()

                        })
                    })
                    break
                default:
                    break
            }

            this.setState({
                isWebsocketConnected: true,
                WebSocketMessage: 'Connected'
            })
        }

        socket.onerror = (error) => {
            this.setState({
                isWebsocketConnected: false,
                WebSocketMessage: 'Error (' + error + ')'
            })
            console.error(error);
        }

        socket.onclose = () => {
            this.setState({
                isWebsocketConnected: false,
                WebSocketMessage: 'Connexion closed'
            })
        }
    }



    handleSubmit(event) {
        event.preventDefault();

        socket.send(JSON.stringify({
            type: "ADD_MESSAGE",
            message: this.state.msg,
            author: localStorage.login,
            date: new Date().toLocaleString()
        }))

        this.setState({
            msg: '',
        });
        
    }

    render() {
        this.initWS(socket);
        return (

            <div>
                <Typography variant="subheading" color="inherit" align="right">
                {this.state.isWebsocketConnected ?
                            (
                                <Badge badgeContent={'OK'} color="primary">                                    
                                    <Typography>Websocket</Typography>
                                </Badge>
                            ) : (
                                <Badge badgeContent={''} color="error">                                   
                                    <Typography>Websocket ({this.state.WebSocketMessage})</Typography>                                    
                                </Badge>
                            )}
                </Typography>

                <Typography variant="display1" color="inherit">
                    Hello <strong>{this.state.login}</strong>
                </Typography>
                
                <Typography variant="subheading" color="inherit" align="right">
                    <ChatIcon /> Messages ({this.state.messages.length})
                </Typography>

                <MessagesList items={this.state.messages} login={localStorage.login} />
                <hr />
                
                <MessageForm chat={this.state} handleChangeChat={this.handleChange} handleSubmitChat={this.handleSubmit} updateMsgChat={this.updateMsg} />

            </div>
        );
    }
}


export default withStyles(styles)(Chat);