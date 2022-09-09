class UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy feed liked_post discover]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    UsersMailer.with(user: user).welcome.deliver_later
    render json: user, status: :created
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(update_user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end


  def discover
    followees_ids = @user.followees.pluck(:id)
    followees_ids << session[:user_id]
    render json: User.where.not(id: followees_ids)
#pluck id is going into the User array and just taking the id # for that user
  end 


  

  def follow
    follower_id = session[:user_id]
    followee_id = params[:user_id]
  Follow.create!(follower_id: follower_id, followee_id: followee_id)
    render json: { success: true }
  end
  
  def unfollow
    follower_id = session[:user_id]
    followee_id = params[:user_id]
    follow = Follow.find_by(follower_id: follower_id, followee_id: followee_id)
    if follow
      follow.destroy
    end
    render json: { success: true }
  end

  def feed
    render json: @user.feed
    # followings = Follow.where(follower_id: session[:user_id])
    
    # render json: followings, each_serializers: FollowingSerializer, include: ["followee.posts.comments.user"]
  end

  def liked_post
    render json: @user.liked_posts
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id] || session[:user_id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:username, :password, :name, :email, :image, :bio, :country, :language)
    end

    def update_user_params
      params.permit(:image, :bio, :country, :language)
    end
end
