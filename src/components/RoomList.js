import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class RoomList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: [],
			newRoom: '',
		};	
		this.roomsRef = this.props.firebase.database().ref('rooms');	
	}

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({ rooms: this.state.rooms.concat(room) });
		});
	}

	createRoom(event) {
		const newRoomName = event.target[0].value;
		this.roomsRef.push({
  		name: newRoomName
		});
	}
		
	logName(event) {
		event.preventDefault();
		console.log(event.target[0].value);
	}

	render(){
		return(
			<section>
				<section>
					<table>
						<colgroup>
							<col/>
						</colgroup>
						<tbody>
							{this.state.rooms.map((room, index) => 
								<tr key={index}>
									<td>{room.name}</td>
								</tr>
								)
							}
						</tbody>
					</table>
				</section>
				<section className="form-container">
					<form className="newRoomForm" onsubmit={(event) => this.createRoom}>
							<label for="roomNameInput">Enter new form name:</label>
							<input type="text" id="roomNameInput" name="roomName" className="roomName"/>
							<input type="submit"/>
					</form>
				</section>
			</section>
		)
	}
}

export default RoomList;
