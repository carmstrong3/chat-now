import React, {Component} from 'react';

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
			this.setState({ messages: this.state.messages.concat(message) });
    });
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
			</section>
		)
	}
}

export default MessageList;
