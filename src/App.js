import React, { Component } from 'react';
import { Chatkit, ChatManager, TokenProvider } from '@pusher/chatkit'
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
import Message from './components/Message';
import './App.css';


class App extends Component {
   
  constructor() {
    super()
      this.state = {
        messages: [],
        joinableRooms: [],
        joinedRooms: [],
        roomId: null
      }
      this.sendMessage = this.sendMessage.bind(this);
      this.subscribeToRoom = this.subscribeToRoom.bind(this);
      this.getRooms = this.getRooms.bind(this);
      this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator: 'v1:us1:cbd24a76-9599-4dbd-869f-3f31e3fe3991',
      userId: 'tim',
      tokenProvider: new TokenProvider({
        url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/cbd24a76-9599-4dbd-869f-3f31e3fe3991/token"
      })
    })

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser
        this.getRooms()    
      })
      .catch(err =>
        console.log('Error on connection: ', err))
  }

  getRooms(){
    this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
      this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms
      })
    })
    .catch(err =>
      console.log('error on joinableRooms: ', err))
  }
    
  subscribeToRoom(roomId) {
    this.setState({
      messages: []
    })
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
        onNewMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }
    })
    .then(room => {
      this.setState({
        roomId: room.id
      })
      this.getRooms()
    })
    .catch(err => console.log('error on subscribing to room: ', err))
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  };

  createRoom(roomName){
    this.currentUser.createRoom({
      name: roomName
    })
    .then(room => this.subscribeToRoom(room.id))
    .catch(err => console.log('error with creating room', err))
  }

  render() {
    return (
      <div className="app">
        <Message />
        <RoomList
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages} />
        <SendMessageForm
          disabled={!this.state.roomId}
          sendMessage={this.sendMessage} />
        <NewRoomForm createRoom={this.createRoom}/>
      </div>
    );
  }
}

export default App;
