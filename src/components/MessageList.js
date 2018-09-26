import React, { Component } from 'react'

const DUMMY_DATA = [
    {
        senderId: 'tim',
        text: "Hey, how's it going?"
    },
    {
        senderId: 'julie',
        text: "Great! How about you?"
    },
    {
        senderId: 'auto',
        text: "Woof woof"
    }
]

class MessageList extends Component {
  render() {
    return (
      <div>
        {DUMMY_DATA.map((message,index) => {
            return(
                <div key={index} className="message">
                    <div className="message-username">{message.senderId}</div>
                    <div className="message-text">{message.text}</div>
                </div>
            )
        })}
      </div>
    )
  }
}

export default MessageList;
