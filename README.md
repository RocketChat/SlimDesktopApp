# Rocket.Chat Slim Desktop Application
![img](https://raw.githubusercontent.com/RocketChat/Rocket.Chat.Artwork/master/Logos/2020/png/logo-horizontal-red.png)

Rocket.Chat Slim Desktop Application is an lighter cross platform chat app version of Rocket.Chat without the bloat and baggage of the full client. It's currently under built.

### Getting Started

1. Clone the repositroy
```sh
git clone https://github.com/RocketChat/SlimDesktopApp/
```

2. Navigate to repo location
```sh
cd SlimDesktopApp
```

3. Install depenedencies
```sh
yarn
```

4. Create the environment variables `.env` file
Till this moment, Only a code-fixed login is present i.e.(No UI for login is present), since we are working on getting the functionality of the main application (Chatting) working first.
That's why It will be needed to provide the login parameters manually in the `.env` file.

The parameters are
- `ROCKETCHAT_URL` : The Rocket.Chat server URL you will be coonnecting to e.g. (`https://open.rocket.chat/`).
- `REACT_APP_EMAIL` : Your Email Address on the Rocket.Chat server e.g. (`user@gmail.com`)
- `REACT_APP_PASSWORD` : Your Password on the Rocket.Chat server e.g. (`password_1234`)

For Example:
```sh
ROCKETCHAT_URL = https://open.rocket.chat/
REACT_APP_EMAIL = user@test.com
REACT_APP_PASSWORD = password_1234
```

5. Run the application
```sh
yarn start
```

### What's Done till now
- [x] Code-Fixed Authentication System
- [x] All Chats List within a single window
- [x] Pop-up a new window for each chat which clicked over
- [x] Real-time Subscription for messages within each window
- [x] Retrieval of messages of each chat with pagination
- [x] Message Parsing System (Emojis/Mentions/Markdown/Paragraphs/...etc)
- [ ] Main Chat Window Functionalities (Send/Delete/Edit/Star/...etc) Messages

### Screenshots
