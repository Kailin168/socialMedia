class User < ApplicationRecord
  has_secure_password
  has_one_attached :image

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
  validates :password, length: { in: 5..15 }, if: :should_validate_password?

  def should_validate_password?
    new_record? ? true : password.present?
  end

  def follower_count
    followers.count
  end

  def followee_count
    followees.count
  end

  def feed
    following_ids = "SELECT followee_id FROM follows WHERE follower_id = :user_id"
    posts = Post.where("user_id IN (#{following_ids})", user_id: id).order(updated_at: :desc).limit(20)
  end

  def i_am_following?(follower_id)
    followers.select {|follower| follower.id == follower_id }.count == 1
  end
  
end
