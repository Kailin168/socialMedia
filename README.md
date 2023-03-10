# weConnect (Social Media)

- Social media platform that enables users to create custom profiles and interact with other users.

DEMO: http://ec2-54-210-65-11.compute-1.amazonaws.com/

Testing user account:

Username: testing
Password: testing123

<img width="1411" alt="Screen Shot 2022-09-19 at 3 44 01 PM" src="https://user-images.githubusercontent.com/103536761/224435096-29738d10-1ddb-4105-a1a1-9f4933dc6a5e.png">



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
