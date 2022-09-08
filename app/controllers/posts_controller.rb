class PostsController < ApplicationController
  before_action :set_post, only: %i[ show update]

  # GET /posts
  def index
    @posts = Post.all

    render json: @posts
  end

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end


  def like
    render json: Like.create!(user_id: session[:user_id], post_id: params[:post_id])
  end


  def unlike
    find_like = Like.find_by(user_id: session[:user_id], post_id: params[:post_id])
    if find_like != nil
      render json: find_like.destroy
    else
      render json: {error: "failed"}
    end
  end

  # DELETE /posts/1
  def delete
    post = Post.find_by(id: params[:id], user_id: session[:user_id])
    if post != nil
      post.destroy
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      new_params = params.permit(:content, :image)
      new_params.merge({
        user_id: session[:user_id]
      })
    end
end
