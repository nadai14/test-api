# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_drecom_session',
  :secret      => '8393592f41bf168bf174b3c9e47734f99e8243e97cd3cb56ecf46b21e5c2ab7edfca7ee6eff5628f57254bff8c3bde8437f00597d562f2ad39077351856c4950'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
