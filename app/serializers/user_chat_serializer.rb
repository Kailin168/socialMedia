class UserChatSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_one :chat
end
