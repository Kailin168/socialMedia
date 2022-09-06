class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :email, :profile_image, :bio, :country, :language, :follower_count, :followee_count

  has_many :posts

end
