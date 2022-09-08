class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :image_url, :user_id, :like_count, :updated_at, :user, :i_liked, :comments
  has_many :likes

  def i_liked
    self.object.i_liked?(@instance_options[:scope][:id])
  end

  def comments
    self.object.comments.map do |comment|
      commentHash = comment.attributes
      commentHash[:user] = comment.user
      commentHash
    end
  end

  def image_url
    if object.image.attached?
      Rails.application.routes.url_helpers.rails_blob_path(object.image, host: "local")
    end
  end

end
