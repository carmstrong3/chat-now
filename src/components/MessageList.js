import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
      this.state = {
      messages: [],
      newMessage: '',
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;		
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }
  
  createMessage = (e) => {
    this.messagesRef.push({
      content: this.state.newMessage,
      roomId: this.props.activeRoom.key,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: this.props.currentUser.displayName
    });
    e.preventDefault();
		this.setState({newMessage: ""});
  }

  handleMessageChange = (e) => {
    const target = e.target.value;
    this.setState({newMessage: target});
  }

  render() {
    return(
      <section>
        <table>
          <tbody>
            {this.state.messages.filter(message =>
              message.roomId === this.props.activeRoom.key).map((message, index) => 
                <tr key={index}>
                  <td>{message.username}</td>
                  <td>{message.content}</td>
                  <td>{message.sentAt}</td>
                </tr>
              )
            }
          </tbody>
        </table>
        <form className="new-message-form" onSubmit={(e) => this.createMessage(e)}>
          <label>Enter new message:</label>
          <input type="text" value={this.state.newMessage} onChange={(e) => this.handleMessageChange(e)}/>
          <input type="submit"/>
        </form>
      </section>
    )
  }
}

export default MessageList;
