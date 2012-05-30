# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_dapi_session',
  :secret      => '7feb9d6e3e27bc8bbe6f050df4187ef1edc6ddd984f35b6ac93d55fc451d1cd205bf7a8377b2ca3ddac3e8fba86ba8d8f29d94d6d57395e98cfa0e25712eda61'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
