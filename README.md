# Smart Vending Machine UI and Node server

## Project Structure

    .
    ├── client                  # Vue client code
    │   ├── public              # Assets used by Vue
    │   ├── src                 # All Vue source code
    │   ├── vue.config.js       # Config file for Vue build artifacts
    │   ├── package.json   
    ├── server                  # Fastify server
    │   ├── plugins             # Managed plugins for Fastify
    │   ├── public              # Build folder copied in by Vue's build
    │   ├── routes              # Folder structure creates route structure
    │   ├── app.js              # Main server app
    ├── package.json            
    └── README.md

## Project Setup

### Run npm install in the root directory and client directory.

`npm i && cd client && npm i && cd ..`

### Set up your AWS credentials

The website makes API call which involve pulling data from DynamoDB. In order to run these calls locally, you need to configure your AWS credentials file. You need a creds file like `[your-name]_credentials.csv`. This file contains your **Access key ID** and **Secret access key**. ***Do not share these keys with anyone.*** Follow [these instructions](https://docs.aws.amazon.com/sdk-for-net/v3/developer-guide/creds-file.html) to tell the server to use your credentials file. Once this is done, you can run the server using the intructions below.

## How to...

### Work on the server (fastify)

1. Build the static Vue assets for prod\
`smart-vending-machine-ui: npm run build`

2. Start the fastify server in dev mode\
`smart-vending-machine-ui: npm run dev`

3. Open [http://localhost:3000](http://localhost:3000)

4. Edit anything in the `server` directory, and the server will automatically refresh

### Work on the front end (Vue)

1. Start the fastify server in dev mode\
`smart-vending-machine-ui: npm run dev`\
*note: you need to run `npm run build` at least once before to populate the `server/public` directory*

2. Start the client server in dev mode\
Open a new terminal\
`smart-vending-machine-ui: cd client`\
`smart-vending-machine-ui/client: npm run serve`

3. Open [http://localhost:8080](http://localhost:8080)

4. Edit anything in the `client` directory, and the server will automatically refresh

### Work on both at the same time

Follow the instructions in **Work on the front end (Vue)**.\
You are also able make changes to the `server` directory, and the server will automatically refresh.

## Available Scripts

### Client

#### `npm run serve`

Starts a Vue app server in dev mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

**All API calls will be routed to the fastify server on [http://localhost:3000](http://localhost:3000)**.\
ex. A call to `/items` will be routed to `localhost:3000/items`.

#### `npm run build`

Builds the Vue project for prod and copies its contents into the server/public directory.
This is the same as running `npm run build` in the `root` directory.

#### `npm run lint`

Runs the linter on all Vue code.

### Server (root)

#### `npm run build`

Builds the Vue project for prod and copies its contents into the server/public directory.\
This is the same as running `npm run build` in the `client` directory.

#### `npm run dev`

Starts the fastify server in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
You need to populate the `public` directory using `npm run build` for this to work.

#### `npm start`

Starts the fastify server in prod mode.\
This is the command that the prod box runs.

