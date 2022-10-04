class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :email, :image_url, :bio, :country, :language, :follower_count, :followee_count, :i_am_following
  
  has_many :posts

  def i_am_following
    if @instance_options[:scope] != nil
      self.object.i_am_following?(@instance_options[:scope][:id])
    else
      false
    end
  end

  def image_url
    if object.image.attached?
      Rails.application.routes.url_helpers.rails_blob_path(object.image, host: "local")
    end
  end


end
