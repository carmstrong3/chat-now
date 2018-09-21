import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';


class MessageList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			newMessage: {username: '', content: '', roomId: '', sentAt: ''},
		};
		this.messagesRef = this.props.firebase.database().ref('Messages');
	}

	componentDidMount() {
		this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
			messages.sentAt = this.messagesRef.push({startedAt: firebase.database.ServerValue.TIMESTAMP}) 
			this.setState({ messages: this.state.messages.concat(message) });
    });
  }


	render() {
		return(
			<section>
				<table>
            <tbody>
              {this.state.messages.filter(message => message.roomId === this.props.activeRoom).map((message) => 
                <tr key={message.roomId}>
                  <td>{message.username}</td>
									<td>{message.content}</td>
									<td>{message.sentAt}</td>
                </tr>
                )
              }
            </tbody>
				</table>
			</section>
		)
	}
}

export default MessageList;
