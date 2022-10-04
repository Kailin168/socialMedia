class Message < ApplicationRecord

  belongs_to :chat
  belongs_to :user

  def broadcast
    ActionCable.server.broadcast("chatroom_#{self.chat.name}", MessageSerializer.new(self))
  end

end
