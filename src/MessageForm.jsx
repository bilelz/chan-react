import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import SendIcon from 'material-ui-icons/Send';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

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
    },
});


class MessagesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: props.chat.msg,
            name: props.chat.name,
            messages: props.chat.messages,
            login: localStorage.login,
            showEmojiPicker: props.chat.showEmojiPicker
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange = event => {
        this.props.handleChangeChat(event);
    };


    handleSubmit(event) {
        event.preventDefault()
        this.props.handleSubmitChat(event)
    }

    showEmoji = (event) => {
        this.setState({
            showEmojiPicker: true,
        });
    }

    addEmoji = (emoji) => {
        this.props.updateMsgChat(emoji.native)
        this.setState({
            showEmojiPicker: false
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <form className={classes.container} align="rigth" fullwidth="true" autoComplete="off" onSubmit={this.handleSubmit}>

                    <TextField
                        id="msg"
                        label="Your message..."
                        className={classes.textField}
                        value={this.props.chat.msg}
                        onChange={this.handleChange}
                        required
                    />


                    <Button type="submit" variant="raised" size="small">Send <SendIcon /> </Button>
                </form>
                {this.state.showEmojiPicker ? (
                    <Picker onSelect={this.addEmoji} native='true' showPreview='false' showSkinTones='false'
                        style={{ float: 'right', minHeight: '3.75em'}} />
                ) : (
                        <Button size="small" onClick={this.showEmoji}
                        style={{ float: 'right', minHeight: '3.75em'}}>
                            <span role='img' aria-label='smiley picker'>😀</span>
                        </Button>
                    )}
            </div>
        );
    }
}

export default withStyles(styles)(MessagesForm)