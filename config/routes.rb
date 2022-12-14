Rails.application.routes.draw do
  resources :user_chats
  mount ActionCable.server => '/cable'
 
  resources :likes
  resources :follows
  resources :comments
  resources :posts
  resources :users

  resources :chats, only: [:index, :create] do
    resources :messages, only: [:index, :create]
  end
  

  post '/users/:id/follow', to: "users#follow", as: "follow_user"
  
  post '/users/:id/unfollow', to: "users#unfollow", as: "unfollow_user"

  get '/discover_new_people', to: "users#discover"
  
  get '/message_followed_people', to: "users#followed"

  post '/post/like', to: "posts#like"

  post '/post/unlike', to: "posts#unlike"

  delete '/delete_post/:id', to: "posts#delete"

  post '/login', to: 'sessions#create'

  post '/create_user', to: 'users#create'

  patch '/update_user', to: 'users#update'

  post '/create_post', to: 'posts#create'

  post '/create_comment', to: 'comments#create'

  get '/all_user', to: 'users#index'

  get '/user_info/:id', to: 'users#show'

  get '/feed', to: 'users#feed'

  get '/liked_post', to: 'users#liked_post'

  get '/me', to: 'sessions#show'

  delete '/logout', to: 'sessions#destroy'

  get '/chats_chatroom', to: 'chats#chatroom'
  
  get '/chats_chatroom', to: 'chats#chatroom'

  # get '/people_already_chatting', to: 'users#people_already_chatting'


  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
