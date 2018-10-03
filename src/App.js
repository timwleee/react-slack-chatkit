import React, { Component } from 'react';
import { Chatkit, ChatManager, TokenProvider } from '@pusher/chatkit'
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
import Message from './components/Message';


class App extends Component {
   
  constructor() {
    super()
      this.state = {
        messages: [],
        joinableRooms: [],
        joinedRooms: []
      }
      this.sendMessage = this.sendMessage.bind(this);
      this.subscribeToRoom = this.subscribeToRoom.bind(this);
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

        this.currentUser.getJoinableRooms()
          .then(joinableRooms => {
            this.setState({
              joinableRooms,
              joinedRooms: this.currentUser.rooms
            })
          })
          .catch(err =>
            console.log('error on joinableRooms: ', err))
      })
      .catch(err => {
        console.log('Error on connection', err)
    }
    
  subscribeToRoom() {
    this.currentUser.subscribeToRoom({
      roomId: 17122611,
      hooks: {
        onNewMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }
    })
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: 17122611
    });
  };

  render() {
    return (
      <div className="App">
        <Message />
        <RoomList rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
        {/* <NewRoomForm /> */}
      </div>
    );
  }
}

export default App;
