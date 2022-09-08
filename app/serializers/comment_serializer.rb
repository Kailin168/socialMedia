class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :comment, :post_id, :comment_parents_id

  belongs_to :user
  belongs_to :post
  # has_one :user
end
