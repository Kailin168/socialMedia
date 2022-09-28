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
        type="text"
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message here"
        value={input}
      />

      <input type="submit" value="Send" />

    </form>
  );
}

export default ChatForm;
