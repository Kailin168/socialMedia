class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    @channel = "chatroom_#{params[:chat_id]}"
    @user = params[:id]
    stream_from @channel
    ActionCable.server.broadcast(@channel, "#{@user} joined the channel")
  end

  def unsubscribed
    ActionCable.server.broadcast(@channel, "#{@user} left the channel")
    stop_all_streams
    # Any cleanup needed when channel is unsubscribed
    puts "=================================================="
    puts "HELLLO I AM UNSUBSCRIBED"
    puts "--------------------------------------------------"
  end
end
