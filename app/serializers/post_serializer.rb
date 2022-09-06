class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :media, :user_id, :like_count, :updated_at, :user

  has_many :likes

end
