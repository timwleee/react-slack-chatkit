import React, { Component } from 'react';
import { Chatkit, ChatManager, TokenProvider } from '@pusher/chatkit'
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
import Message from './components/Message';


class App extends Component {

  state = {
    messages: []
  }

  componentDidMount() {

    const chatManager = new ChatManager({
      instanceLocator: 'v1:us1:cbd24a76-9599-4dbd-869f-3f31e3fe3991',
      userId: 'tim',
      tokenProvider: new TokenProvider({
        url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/cbd24a76-9599-4dbd-869f-3f31e3fe3991/token"
      })
    })

    // chatManager.connect()
    // .then(currentUser => {
    //   currentUser.subscribeToRoom({
    //     roomId: 17119650,
    //     hooks: {
    //       onNewMessage: message => {
    //         console.log('message.text: ', message.text);
    //       }
    //     }
    //   })
    // })

  chatManager.connect()
  .then(currentUser => {
    console.log('Successful connection', currentUser)
    currentUser.subscribeToRoom({
      roomId: 17122611,
      hooks: {
        onNewMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      },
      messageLimit: 10
    })
  })
  .catch(err => {
    console.log('Error on connection', err)
  })

  }

  render() {
    return (
      <div className="App">
        <Message />
        {/* <RoomList /> */}
        <MessageList messages={this.state.messages}/>
        <SendMessageForm />
        {/* <NewRoomForm /> */}
      </div>
    );
  }
}

export default App;
