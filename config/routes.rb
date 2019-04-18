Rails.application.routes.draw do
  devise_for :users
  root 'places#index'

  resources :users, only:[:show]
  resources :places, only:[:index, :new, :create, :show]
end
