import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ImageIcon from 'material-ui-icons/Image';
import MoodIcon from 'material-ui-icons/Mood';
import WorkIcon from 'material-ui-icons/Work';
import BeachAccessIcon from 'material-ui-icons/BeachAccess';
import blue from 'material-ui/colors/blue';

class MessagesList extends React.Component {
  render() {


    return (
      <List>
        {this.props.items.map(item => (
          
          <div>

            {this.props.login == item.author ?
              (
                <ListItem key={item.date} style={{ textAlign: 'right'}}>
                  <ListItemText primary={item.message} secondary={item.date + ' by ' + item.author + '(you)'}
                    />
                  <Avatar style={{color: '#fff', backgroundColor: blue[500]}}>
                    <MoodIcon/>
                  </Avatar>
                </ListItem>
              ) : (
                <ListItem key={item.date}>
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