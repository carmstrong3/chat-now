import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import './App.css';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCwxFf5o7ylV69CBUWQ3YK_l29_NVN42M4",
  authDomain: "chat-now-58651.firebaseapp.com",
  databaseURL: "https://chat-now-58651.firebaseio.com",
  projectId: "chat-now-58651",
  storageBucket: "chat-now-58651.appspot.com",
  messagingSenderId: "173593084326",
};

firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
      activeRoom: {},
      currentUser: {},
    }
  }

  setActiveRoom = (room) => {
    this.setState({activeRoom: room});
  }

  setUser = (user) => {
    this.setState({currentUser: user});
  }

  resetActiveRoom = () => {
    this.setState({activeRoom: {}});
  }
    
  render() {
    return (
      <div className="App">
        <header>
        </header>
        <main id='main'>
          <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom} resetActiveRoom={this.resetActiveRoom}/>
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} currentUser={this.state.currentUser}/>
					<User firebase={firebase} setUser={this.setUser} currentUser={this.state.currentUser}/>
        </main>
        <footer>
        </footer>
      </div>
    );
  }
}

export default App;
