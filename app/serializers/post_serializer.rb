class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :media, :user_id, :like_count, :updated_at, :user, :i_liked, :comments, :comment_user
  has_many :likes

  def i_liked
    self.object.i_liked?(@instance_options[:scope][:id])
  end

  def comment_user
    self.object.comments.map do |c|
      c.user
    end
  end

end
