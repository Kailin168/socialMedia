class UsersMailer < ApplicationMailer

  def welcome
    @user = params[:user]
    mail to: @user.email, subject: 'Welcome to Social Media !faker'
  end

end
