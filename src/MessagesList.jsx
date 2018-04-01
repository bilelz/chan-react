import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import MoodIcon from 'material-ui-icons/Mood';
import blue from 'material-ui/colors/blue';

class MessagesList extends React.Component {
  render() {


    return (
      <List>
        {this.props.items.map(item => (
          
          <div key={item.date}>

            {this.props.login === item.author ?
              (
                <ListItem style={{ textAlign: 'right'}}>
                  <ListItemText primary={item.message} secondary={item.date + ' by ' + item.author + '(you)'}
                    />
                  <Avatar style={{color: '#fff', backgroundColor: blue[500]}}>
                    <MoodIcon/>
                  </Avatar>
                </ListItem>
              ) : (
                <ListItem>
                  <Avatar>
                    <MoodIcon />
                  </Avatar>
                  <ListItemText primary={item.message} secondary={item.date + ' by ' + item.author} />
                </ListItem>
              )}
          </div>
        ))}
      </List>
    );
  }
}

export default MessagesList