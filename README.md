# Translation Manager

A Rails application server that connects to [localeapp](https://www.localeapp.com) to retrieve translations and store them in a Redis DB.

The server has the following API to be used by a translation consumer:
- REST GET endpoint to retrieve all translations as JSON
- WebSocket channel

## System dependencies

Ruby version `2.x` (recommended)

Install [Redis DB](http://redis.io/)

## Design

Currently see `routes.rb` file for the routes config

```rb
  get "homes/index", to: "homes#index"
  resource :homes

  mount TranslatorManager::Engine, at: '/translations'
```

### GET API

The [translator_manager engine](https://github.com/kristianmandrup/translator_manager) has a single controller [translations_controller#index](https://github.com/kristianmandrup/translator_manager/blob/master/app/controllers/translator_manager/translations_controller.rb#L5) which is mounted as the `root` `/` route.

The route controller uses the [translation service](https://github.com/kristianmandrup/translator_manager/blob/master/app/services/translator_manager/translation.rb) which retrieves translations for a given locale from the DB.

### Real Time API

The `HomesController` contains the following:

```rb
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
```

The POST `/homes` (create) route, creates the Redis publish `realtime_msg`channel.

### Translator Manager engine

Contains a task (script) to load locale files into DB

The main `translation_manager.rb` file is executed when the engine is mounted. 

The engine will setup the sync to localeapp. The engine uses the [translator gem](https://github.com/kristianmandrup/translator)

```rb
def translator(&block)
  Translator.setup do |translator_config|
    translator_config.instance_eval(&block)
  end
end

def sync!(paths = nil)
  paths = Array(paths)
  paths += I18n.config.load_path if defined?(I18n)

  if SystemHelper.internet_connection?
    puts 'Synchronizing translations...'
    ::Translator.load!(paths)
  else
    puts 'No Internet connection, failed to synchronize translations'
  end
end

def setup!
  I18n.backend = new_store
  I18n.load_path += Dir["#{ Translator.data_directory }/*.{rb,yml}"]
end

private
  def new_store
    new_store = I18n::Backend::KeyValue.new(Translator::Store.instance)
    fallback_required ? I18n::Backend::Chain.new(new_store, I18n.backend) : new_store
  end
end
```

## Installation

`bundle install`

## Usage

`rails server`

`gem install foreman`

`foreman start`

Load application in browser using `http://localhost:3000/homes/index`

Start rail console using `rails c`

Execute from rails console

`$redis.publish 'realtime_msg', {'en'=> {'welcom' => 'Welcome'}, recipient_user_ids: [41, 42]}.to_json`

## Configuration

See initializers
- `i18n_backend.rb`
- `redis.db`
- `translator_manager.rb`

### Localeapp config

The `translator_manager` initializer expects the environment variable `LOCALEAPP_API_KEY` to contain the localeapp key.

```
translator_config.localeapp_api_key = ENV['LOCALEAPP_API_KEY'].presence
```

### Redis config

`location = ENV["REDISCLOUD_URL"] || 'redis://127.0.0.1:6379/0'`

## Database creation

TODO

## Tests

TODO

`rake test`

## Deployment instructions

TODO: Use docker and docker compose

* ...


Please feel free to use a different markup language if you do not plan to run
<tt>rake doc:app</tt>.
