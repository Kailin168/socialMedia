import React, {
  useEffect, useState, useContext, FormEvent,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ChatMessages from './ChatMessages';
import ChatForm from './ChatForm';
import { ActionCableContext, AuthContext } from '../contexts/contexts';
import { IMessage, IChat } from '../types/ITypes';

function Chatroom() {
  const params = useParams();
  const [chatMessages, setChatMessages] = useState<IMessage[]>([]);
  const [chatRooms, setChatRooms] = useState<IChat[]>([]);
  const [chatChannel, setChatChannel] = useState<string>('');

  const [chatInput, setChatInput] = useState('');

  const { user } = useContext(AuthContext);

  const { cable } = useContext(ActionCableContext);
  // const location = useLocation();
  // useEffect(() => {
  //   if (location.pathname.includes('/profile/')) {
  //     fetchFromServer();
  //   }
  // }, [location.pathname]);

  useEffect(() => {
    fetch(`/chats_chatroom?user_id=${params.otherUserId}`)
      .then((res) => {
        if (res.ok) {
          res.json()
            .then((data) => {
              // setChatRooms(data);
              setChatChannel(data.name);
            });
        }
      });
  }, []);

  // on load get all chats for a room (we'll change this to current room later)
  useEffect(() => {
    if (chatChannel === '') {
      return;
    }

    fetch(
      `/chats/${chatChannel}/messages`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
        },
      },
    )
      .then((res) => {
        if (res?.status !== 500 && res?.status !== 404) {
          res.json();
        }
        return null;
      })
      .then((data) => {
        if (data) {
          setChatMessages(data);
        }
      });
  }, [chatChannel]);

  useEffect(() => {
    let channel: ActionCable.Channel & { received: (data: string) => void; };
    if (chatChannel) {
      channel = cable.subscriptions.create(
        { channel: 'ChatroomChannel', chat_id: chatChannel, id: user.id },
        // { received: (data: string) => console.log(data) },
        {
          received: (newMessage) => {
            // debugger;
            // setChatMessages((previousMessages) => [...previousMessages, newMessage]);
          },
        },
      );
    }
    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [chatChannel]);

  // ---------------------- //
  // for the subscriptions (connection)
  // we can unsubscribe with channel.unsubscribe()
  // we'll probably put the above into a useEffect
  // ---------------------- //

  // we need a handle submit for when we submit a new chat...
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetch(`/chats/${chatChannel}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify({ content: chatInput }),
    });
  };

  // const chatRoomOptions = chatRooms.map((r) => <option key={r.id} value={r.id} aria-label={r.id.toString()} />);
  // chatRoomOptions.unshift(<option key={-1} value={-1} aria-label="No chatroom selected" />);

  return (
    <div>
      <ChatMessages chatMessages={chatMessages} />
      <ChatForm setInput={setChatInput} input={chatInput} handleSubmit={handleSubmit} />

      {/* The select tag here is to choose the current room once we implement that
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setChatChannel(parseInt(e.target.value, 10))}
        value={chatChannel}
      >
        { chatRoomOptions }
      </select> */}

    </div>
  );
}

export default Chatroom;
