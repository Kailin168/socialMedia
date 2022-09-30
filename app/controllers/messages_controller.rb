class MessagesController < ApplicationController
  def index
    if find_chat
      render json: @chat.messages
    else
      render json: { error: 'Could not find a chat with that id' }, status: 404
    end
  end

  def create
    message = current_user.messages.create!(message_params)
    message.broadcast
    render json: message, status: :created
  end

  private

  def message_params
    params.permit(:content, :chat_id)
  end

  def find_chat
    @chat ||= Chat.find_by(id: params[:chat_id])
  end

end
