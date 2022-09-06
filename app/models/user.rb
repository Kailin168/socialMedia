class User < ApplicationRecord
  has_secure_password

  has_many :posts, dependent: :destroy
  has_many :likes
  has_many :liked_posts, through: :likes, source: :post
  has_many :comments


  has_many :followed_users, foreign_key: :follower_id, class_name: 'Follow'
  has_many :followees, through: :followed_users
  has_many :following_users, foreign_key: :followee_id, class_name: 'Follow'
  has_many :followers, through: :following_users


  validates :username, :email, uniqueness: true
  validates :username, :name, :email, presence: true
  validates :bio, presence: true
  validates :username, :password, length: { in: 3..15 }
  
  def follower_count
    followers.count
  end

  def followee_count
    followees.count
  end

  
  def feed
    following_ids = "SELECT followee_id FROM follows WHERE follower_id = :user_id"
    Post.where("user_id IN (#{following_ids})", user_id: id).order(updated_at: :desc).limit(20)
  end
  
end
