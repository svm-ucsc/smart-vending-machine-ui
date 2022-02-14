
## Project Structure

    .
    ├── client                  # Vue client code
    │   ├── public              # Public facing assets used by Vue
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

Run npm install in the root directory and client directory

`npm i && cd client && npm i && cd ..`

## Available Scripts

In the root directory, you can run:

### `npm run build`

To build the Vue project and copy its contents into the server/public directory

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

