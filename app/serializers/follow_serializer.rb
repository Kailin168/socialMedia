class FollowSerializer < ActiveModel::Serializer
  attributes :id, :followed_user_id, :following_user_id
end
