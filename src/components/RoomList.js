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

	createRoom() {
		const newRoomName = this.newRoom;
		this.roomsRef.push({
  		name: newRoomName
		});
	}
	
	handleRoomChange(event) {
		const target = event.target.value;
		console.log("target is: " + target);
		this.setState({ newRoom: target});
		console.log("newRoom is: " + this.newRoom);
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
					<form className="newRoomForm" onsubmit={() => this.createRoom}>
							<label for="roomNameInput">Enter new form name:</label>
							<input type="text" id="roomNameInput" name="roomName" className="roomName" onChange={(e) => {this.handleRoomChange(e)}}/>
							<input type="submit"/>
					</form>
				</section>
			</section>
		)
	}
}

export default RoomList;
