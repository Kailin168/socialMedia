class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :media, :user_id
end
