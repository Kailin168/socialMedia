class ChatsController < ApplicationController
  def index
    render json: Chat.all, include: :messages
  end

  def chatroom
    user1_chats = User.find(session[:user_id]).chats
    user2_chats = User.find(params[:user_id]).chats
    
    same = user1_chats & user2_chats
    
    if same.length == 0
      name = [session[:user_id], params[:user_id].to_i].minmax.join("-")
      chat = Chat.create!(name:)
      UserChat.create!(user_id: session[:user_id], chat_id: chat.id)
      UserChat.create!(user_id: params[:user_id], chat_id: chat.id)
      render json: chat, status: :ok
    else
      chat = Chat.find_by(name: same[0].name)
      render json: chat, status: :ok
    end
  end

end
