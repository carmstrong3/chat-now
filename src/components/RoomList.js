import React, {Component} from 'react';

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
    this.roomsRef.push({
      name: this.state.newRoom
    });
    event.preventDefault();	
  }
	
  handleRoomChange(event) {
    const target = event.target.value;
    this.setState({ newRoom: target});
  }	

  render() {
    return(
      <section>
        <section>
          <table>
            <colgroup>
              <col/>
            </colgroup>
            <tbody>
              {this.state.rooms.map((room, index) => 
                <tr key={index} onClick={() => this.props.setActiveRoom(room)}>
                  <td>{room.name}</td>
                </tr>
                )
              }
            </tbody>
          </table>
        </section>
        <section className="form-container">
          <form className="new-room-form" onSubmit={(e) => this.createRoom(e)}>
            <label>Enter new form name:</label>
              <input type="text" value={this.state.newRoom} onChange={(e) => {this.handleRoomChange(e)}}/>
              <input type="submit"/>
          </form>
        </section>
      </section>
    )
  }
}

export default RoomList;
