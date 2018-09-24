import React, {Component} from 'react';

class User extends Component {
  constructor(props) {
    super(props);
  }
  
  signInWithPopup = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }
	
	signOut = () => {
    this.props.firebase.auth().signOut();
  }
  
  componentDidMount = () => {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  handleDisplayName = () => {
    if (this.props.currentUser === null) {
      return <span>Guest</span>;
    } else {
      return <span>{this.props.currentUser.displayName}</span>;
    }
  }

  render () {
    return (
      <section className="user-component">
        <p>{this.handleDisplayName()}</p>
        <span className="button-span">
          <button className="sign-in-button" onClick={this.signInWithPopup}>Sign In</button>
          <button className="sign-out-button" onClick={this.signOut}>Sign Out</button> 
          </span>
      </section>
    )
  }
}

export default User;
