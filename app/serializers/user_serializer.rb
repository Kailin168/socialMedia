class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :email, :profile_image, :bio, :country, :language, :follower_count, :followee_count, :i_am_following

  # has_many :followed_users, foreign_key: :follower_id, class_name: 'Follow'
  # has_many :followees, through: :followed_users

  has_many :posts

  def i_am_following
    self.object.i_am_following?(@instance_options[:scope][:id])
  end

end
