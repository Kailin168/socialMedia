class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :name
      t.string :email
      t.string :profile_image
      t.string :bio
      t.string :country
      t.string :language

      t.timestamps
    end
  end
end