import React from 'react';

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLElement>) => void
  setInput: (value: string) => void
  input: string
}

function ChatForm({ handleSubmit, setInput, input }: Props) {
  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        className="flex py-2 pl-4 mx-3 mt-5 w-5/6 bg-gray-100 rounded-full outline-none focus:text-gray-700"
        type="text"
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message here"
        value={input}
        name="message"
      />
      <input className="flex mt-5 items-center justify-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Send" />
    </form>
  );
}

export default ChatForm;
