# Chat Test Application Documentation

## Introduction

This is a test application for a chat system. It allows users to authenticate, access messages in chat rooms, and perform other chat-related operations.

## Installation

To set up and run the application, follow these steps:

1. **Clone Repository:** 
    ```sh
    git clone https://github.com/aramlmanukyan/chat-test-app.git
    ```

2. **Install Dependencies:** 
    ```sh
    cd chat-test-app
    npm install
    ```

3. **Seed Database:** 
    ```sh
    npm run seed
    ```

    This command will seed the database with users and a default chat room. Here are the credentials for the seeded users:
    - John: password - 12345678
    - James: password - 12345678
    - Bill: password - 12345678
    - Steve: password - 12345678
    - Ann: password - 12345678

4. **Environment Configuration:** 
    As it is a test project, the `.env` file is included in this repo. You can modify it if necessary.

5. **Start Server:** 
    ```sh
    npm start
    ```

    This will start the server on port 3001 by default. You can modify the port configuration in the `.env` file if needed.

## Usage

Once the server is running, you can start using the API endpoints to interact with the chat application using Postman.

## Chat App API Postman Collection

This Postman collection provides a set of requests to test the API endpoints of Chat App Node Express server. 

### Prerequisites

- [Postman](https://www.postman.com/) installed on your machine.

### Getting Started

Import the collection (postman-collection.json) into Postman.

### Collection Overview

The collection contains the following requests:

- **Login**: Sends a POST request to `localhost:3001/api/v1/users/login` to authenticate a user. 

    You can use one of the seeded users' credentials, for example:
    ```json
    {
        "name": "John",
        "password": "12345678"
    }
    ```

    You should receive a "success" status and a token that you will use for further requests.

    Example response:
    ```json
    {
        "status": "success",
        "body": {
            "token": "your_access_token_here"
        }
    }
    ```

    For all further requests, provide the token in the headers as a Bearer token:
    ```
    Authorization: Bearer your_access_token_here
    ```
    Alternatively, you can add it with Postman by going to the Auth tab and choosing Bearer token.

- **Get Messages**: Sends a GET request to `localhost:3001/api/v1/rooms/{roomId}/messages` to retrieve messages for a specific room.

    Provide the room ID in the URL. Example:
    ```
    localhost:3001/api/v1/rooms/65b61d7a8db4edc72edb9362/messages
    ```

    You should receive a success status and an array of messages in the response body.

- **Delete Message**: Sends a DELETE request to `localhost:3001/api/v1/messages/{messageId}` to delete a message.

    Provide the message ID you want to delete (it should be the message that was sent by the current user).

    Example:
    ```
    localhost:3001/api/v1/messages/65ea36b670395ea5450da0f6
    ```
### Testing Endpoints with Jest

You can test the endpoints using Jest tests. Simply run the command:

```sh
npm test
```

### Chatting via WebSocket Service

For real-time chatting, you can connect to the WebSocket service. Unfortunately, it's not possible to export the WebSocket collection from Postman, so I've shared it via URL: https://go.postman.co/workspace/meetQ~25f0d120-4eb5-4fbe-aa07-fdbedccaf761/collection/65eb6757fd7b469b2c424bc4

1. **WebSocket URL**: `ws://localhost:3001`

2. **Token**: Provide the token that you received after login.

After connecting, the server will automatically add you to the default room, and you'll be able to send and receive messages in real-time with WebSocket.

### Sending a Message

To send a message, emit your message with the "chatMessage" event listener.

### Receiving Messages

You can listen to incoming messages using the same "chatMessage" event listener.