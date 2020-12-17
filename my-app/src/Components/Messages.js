import React from 'react';
import './Messages.css';

function Messages() {
    return (
        <div className="messages">
            <Message
                name="1"
                message="hi"
                timestamp=""
                avatar=""
            />
            <Message
                name="2"
                message="ciao"
                timestamp=""
                avatar=""
            />
            <Message
                name="3"
                message="welkommen"
                timestamp=""
                avatar=""
            />
            <Message
                name="4"
                message="hola!"
                timestamp=""
                avatar=""
            />
        </div>
    )
}

export default Messages
