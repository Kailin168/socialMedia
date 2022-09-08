class Post < ApplicationRecord
  belongs_to :user
  has_one_attached :image

  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  
  def like_count
    likes.count
  end

  def i_liked?(session_user_id)
    likes.select {|like| like.user_id == session_user_id }.count == 1
  end

end
