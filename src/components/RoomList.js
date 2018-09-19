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
		console.log(this.state.newRoom);
		this.roomsRef.push({
  		name: this.state.newRoom
		});
		event.preventDefault();	
	}
	
	handleRoomChange(event) {
		const target = event.target.value;
		console.log("target is: " + target);
		console.log("event target is: " + event.target.value);
		this.setState({ newRoom: target});
		console.log("newRoom is: " + this.state.newRoom);
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
					<form className="newRoomForm" onSubmit={(e) => this.createRoom(e)}>
							<label>Enter new form name:</label>
							<input type="text" id="roomNameInput" name="roomName" className="roomName" onChange={(e) => {this.handleRoomChange(e)}}/>
							<input type="submit" value="Submit"/>
					</form>
				</section>
			</section>
		)
	}
}

export default RoomList;
