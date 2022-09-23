class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :email, :image_url, :bio, :country, :language, :follower_count, :followee_count, :i_am_following, :created_at
  
  has_many :posts

  def i_am_following
    self.object.i_am_following?(@instance_options[:scope][:id])
  end

  def image_url
    if object.image.attached?
      Rails.application.routes.url_helpers.rails_blob_path(object.image, host: "local")
    end
  end


end
