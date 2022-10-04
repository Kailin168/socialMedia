class MessagesController < ApplicationController
  before_action :find_chat, only: %i[ create ]

  def index
    if find_chat
      render json: @chat.messages
    else
      render json: { error: 'Could not find a chat with that id' }, status: 404
    end
  end

  def create
    additional_params = {
      user_id: session[:user_id],
      chat_id: @chat.id
    }
    new_message = message_params.merge(additional_params)
    message = current_user.messages.create!(new_message)
    message.broadcast
    render json: message, status: :created
  end

  private

  def message_params
    params.permit(:content)
  end

  def find_chat
    @chat ||= Chat.find_by(name: params[:chat_id])
  end

end
