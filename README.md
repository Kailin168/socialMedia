# weConnect (Social Media)

- Social media platform that enables users to create custom profiles and interact with other users.

## Creator

- [Kai Lin](https://github.com/Kailin168)

# Descriptions

- Employed Active Storage to manage uploaded images as profile images and/or post content.
- Integrated Action Mailer to send out a welcome message for the new user account.
- Deployed WebSocket API using Action Cable to enable real-time messaging functionality for users.
- Developed a RESTful API backend using Ruby on Rails and Postgres as the datastore.
- Built the front end with ReactJS and used Context API to manage the data flow.

# System dependencies

- Ruby: 3.1.2
- Node: 16.17.1
- PostgreSQL: 12.12

# Configuration:

- Install packages:

  - bundle install
  - npm install --prefix client

- Database creation & initialization:

  - rails db:create db:migrate

- How to run the test suite:
  - rails s
  - npm start --prefix client
  - open [localhost:4000](http://localhost:4000/) on your browser
