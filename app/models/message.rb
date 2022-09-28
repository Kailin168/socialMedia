class Message < ApplicationRecord

  belongs_to :chat
  belongs_to :user

  def broadcast
    ActionCable.server.broadcast("chat#{self.chat_id}", MessageSerializer.new(self))
  end

end
