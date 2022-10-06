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
    <div className="bg-slate-100 w-full h-3/4 border rounded-md overflow-auto">

      {chatMessages.map((message) => (
        <div key={message.id} className={message.user_id === user.id ? 'flex justify-end' : 'flex'}>

          <div className={message.user_id === user.id ? 'flex flex-col m-2 border border-md rounded-md pl-3 bg-slate-300 w-2/3' : 'flex flex-col m-2 border border-md rounded-md pl-3 bg-blue-300 w-2/3'}>
            <div className="font-extrabold text-lg">{message.content}</div>
            <div className="flex flex-row items-center">
              <div className="text-xs">{message.user?.name}</div>
              <img className="p-1 w-8 h-8 rounded-full ring-gray-300 dark:ring-gray-500" src={message.user.image_url || Constants.DEFAULT_PROFILE_IMAGE_URL} alt="profile" />
              <div className="text-xs">{(new Date(message.created_at)).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}

export default ChatMessages;
