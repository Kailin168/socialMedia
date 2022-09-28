class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    stream_from "chatroom_#{params[:user_id]}#{params[:recipient_id]}"
  end

  def unsubscribed
    stop_all_streams
    # Any cleanup needed when channel is unsubscribed
    puts "=================================================="
    puts "HELLLO I AM UNSUBSCRIBED"
    puts "--------------------------------------------------"
  end
end
