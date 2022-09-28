class ChatsController < ApplicationController
  def index
    render json: Chat.all, include: :messages
  end


end
