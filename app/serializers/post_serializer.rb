class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :media, :user_id, :like_count

  has_many :likes
end
