import React from 'react';
import { IMessage } from '../types/ITypes';

interface Props {
  chatMessages: IMessage[]
}

function ChatMessages({ chatMessages }:Props) {
  return (
    <div>

      {chatMessages.map((message) => (
        <p key={message.id}>
          {message.content}
          {' '}
          -
          {' '}
          {message.user?.name}
        </p>
      ))}

    </div>
  );
}

export default ChatMessages;
