import React, { useContext } from 'react';
import { IMessage } from '../types/ITypes';
import { AuthContext } from '../contexts/contexts';
import Constants from '../utils/Constants';

interface Props {
  chatMessages: IMessage[]
}

function ChatMessages({ chatMessages }:Props) {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-slate-600 overflow-auto">

      {chatMessages.map((message) => (
        <div key={message.id}>

          <div className={message.user_id === user.id ? 'flex justify-end' : 'flex justify-start'}>
            {message.content}
            :
            {message.user?.name}
            <img className="p-1 w-12 h-12 rounded-full ring-gray-300 dark:ring-gray-500" src={message.user.image_url || Constants.DEFAULT_PROFILE_IMAGE_URL} alt="profile" />
            {(new Date(message.created_at)).toLocaleDateString()}
          </div>
        </div>
      ))}

    </div>
  );
}

export default ChatMessages;
