class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :comment, :post_id, :comment_parents_id
end
