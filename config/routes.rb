Rails.application.routes.draw do
  resources :likes
  resources :follows
  resources :comments
  resources :posts
  resources :users
  
  post '/users/:id/follow', to: "users#follow", as: "follow_user"
  
  post '/users/:id/unfollow', to: "users#unfollow", as: "unfollow_user"

  post '/login', to: 'sessions#create'

  post '/create_user', to: 'users#create'

  post '/create_post', to: 'posts#create'

  post '/create_comment', to: 'comments#create'

  get '/feed', to: 'users#feed'

  get '/liked_post', to: 'users#liked_post'

  get '/me', to: 'sessions#show'

  delete '/logout', to: 'sessions#destroy'
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
