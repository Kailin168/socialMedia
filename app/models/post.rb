class Post < ApplicationRecord
  belongs_to :user

  has_many :likes
  has_many :comments
  
  def like_count
    likes.count
  end

  def i_liked?(session_user_id)
    likes.select {|like| like.user_id == session_user_id }.count == 1
  end

end
