import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import './App.css';

<script src="https://www.gstatic.com/firebasejs/5.5.0/firebase.js"></script>
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCgQovkY_pfDRA_C7YVReNC1Fj2IkfA1wU",
  authDomain: "chat-now-72b22.firebaseapp.com",
  databaseURL: "https://chat-now-72b22.firebaseio.com",
  projectId: "chat-now-72b22",
  storageBucket: "chat-now-72b22.appspot.com",
  messagingSenderId: "1002503639211"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
				<header>
				</header>
				<main>
					<Route exact path="/" component={RoomList}/>
				</main>
				<footer>
				</footer>
      </div>
    );
  }
}

export default App;
