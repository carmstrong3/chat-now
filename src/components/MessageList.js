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
		this.messagesRef = this.props.firebase.database().ref('messages');
	}

	componentDidMount() {
		this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
			message.username = snapshot.child("username").val();
			message.content = snapshot.child("content").val();
			message.sentAt = snapshot.child("sentAt").val();
			message.roomId = snapshot.child("roomId").val(); 
			this.setState({ messages: this.state.messages.concat(message) });
    });
  }


	render() {
		return(
			<section>
				<table>
            <tbody>
              {this.state.messages.map((message, index) => 
                <tr key={index}>
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
