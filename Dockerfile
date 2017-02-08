FROM ruby:2.3.3
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
ARG APP_NAME
ENV APP_NAME translator-app
RUN mkdir $APP_NAME
WORKDIR $APP_NAME
ADD Gemfile $APP_NAME/Gemfile
ADD Gemfile.lock $APP_NAME/Gemfile.lock
RUN bundle install
ADD . /$APP_NAME
