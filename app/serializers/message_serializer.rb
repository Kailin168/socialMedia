class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :chat_id, :created_at

  belongs_to :user
end
