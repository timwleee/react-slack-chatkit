import React, { Component } from 'react'
import Message from './Message';
import ReactDOM from 'react-dom';
import RoomList from './RoomList';

class MessageList extends Component {

  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this)
    this.shouldScrollToBottom = node.scrollTop + node.clientHeigh + 100 >= node.scrollHeight
  }

  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this)
      node.scrollTop = node.scrollHeight
    }
  }

  render() {
    if (!this.props.roomId) {
      return(
        <div className="message-list">
          <div className="join-room">
            Join a Room
          </div>
        </div>
      )
    }

    return (
      <div>
        {this.props.messages.map((message,index) => {
            return(
                <Message key={index} username={message.senderId} text={message.text}/>
            )
        })}
      </div>
    )
  }
}

export default MessageList;
