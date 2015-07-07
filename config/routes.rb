Rails.application.routes.draw do
  get "/welcome", to: "translation#index"
  get "homes/index", to: "homes#index"
  resource :homes
  
  mount TranslatorManager::Engine, at: '/translations'
end
