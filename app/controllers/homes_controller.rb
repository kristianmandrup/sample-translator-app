class HomesController < ApplicationController
	def index
		@translations = TRANSLATION_STORE
	end

	def create
		@translations = I18n.backend.store_translations(params[:locale], {params[:key] => params[:value]}, :escape => false)
		
		$redis.publish 'realtime_msg', { params[:locale] => {params[:key] => params[:value]}, recipient_user_ids: [41, 42]}.to_json

		flash[:notice] = "Added translation"
		# render nothing: true
		redirect_to homes_path
	end

	def show
		@translations = TRANSLATION_STORE
	end
end
