class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :media, :user_id, :like_count, :updated_at, :user, :i_liked, :comments
  has_many :likes

  def i_liked
    self.object.i_liked?(@instance_options[:scope][:id])
  end

end
