# Use this hook to configure translator manager.
TranslatorManager.setup do |config|
  # ==> Param Key
  # This key will be used for finding the locale from the request
  # parameters. Defaults to `locale`.
  # config.param_key = :locale

  # Translator Configurations
  config.translator do |translator_config|
    # ==> Storage Configurations
    # translator_config.storage = :Redis
    # translator_config.storage_options = { host: 'localhost', port: 6379, db: 1 }

    # ==> Output Configuration
    # By default there is no logging, you can set it to any output
    # stream which respond to `puts`.
    # translator_config.output_stream = nil

    # ==> Localeapp Configuration
    translator_config.localeapp_api_key = ENV['LOCALEAPP_API_KEY'].presence || 'vB46orjZwYjNMmCRpkWAByXoOo7jPQ1mpZNUcm1HWjdzbQquNp'
    # It is the directory where localeapp will sync all the locales files.
    translator_config.data_directory = Rails.root.join('config', 'translator_locales')
  end
end
