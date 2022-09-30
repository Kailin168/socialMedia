import React from 'react';

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLElement>) => void
  setInput: (value: string) => void
  input: string
}

function ChatForm({ handleSubmit, setInput, input }: Props) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="flex w-4/5 py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
        type="text"
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message here"
        value={input}
        name="message"
      />
      <input className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Send" />
    </form>
  );
}

export default ChatForm;
