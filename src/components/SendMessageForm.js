import React, { Component } from 'react'

class SendMessageForm extends Component {

    constructor() {
        super()
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }


    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.message);
    }

  render() {
    return (
      <div>
        <form
            onSubmit={this.handleSubmit}
            className="send-message-form">
            <input
                onChange={this.handleChange}
                value={this.state.message}
                placeholder="Type Message"
                type="text"
            />
        </form>
      </div> 
    )
  }
}

export default SendMessageForm;