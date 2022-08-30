class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.integer :user_id
      t.string :comment
      t.integer :post_id
      t.integer :comment_parents_id

      t.timestamps
    end
  end
end
