import React from 'react';
import { IMessage } from '../types/ITypes';

interface Props {
  chatMessages: IMessage[]
}

function ChatMessages({ chatMessages }:Props) {
  return (
    <div className="w-3/4 h-4/5 bg-slate-600 overflow-auto">

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
