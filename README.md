# Translation Manager

## System dependencies

Ruby version `2.x` (recommended)

[Redis DB](http://redis.io/)

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

* Configuration

See initializers
- `i18n_backend.rb`
- `redis.db`
- `translator_manager.rb`

The `translator_manager` initializer expects the environment variable `LOCALEAPP_API_KEY` to contain the localeapp key.

```
translator_config.localeapp_api_key = ENV['LOCALEAPP_API_KEY'].presence
```

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


Please feel free to use a different markup language if you do not plan to run
<tt>rake doc:app</tt>.
