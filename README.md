# AI-EarthHack

## How to use
After cloning the repository, we will need to set up the backend server and frontend separately

For the server,
- `cd server` to move into the server directory
- `npm i` to install the dependencies
- export your OPEN_API_KEY on your terminal. For more detailed guideline, consult: https://platform.openai.com/docs/quickstart?context=node
- `npm start` to start the server
- (Optional) you can ping `http://localhost:4000/healthcheck` to see if the server is running properly.

For the frontend, we recommend running in development mode,
- `cd client` to move into the frontend directory
- `npm i` to install the dependencies
- `npm run dev` to start the frontend
- open `http://localhost:3000` in your browser to check it
