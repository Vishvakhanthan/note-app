# Note App 📝

A full-stack note-taking application built with React and Node.js.

## Environment Setup 🌍

To run the backend, you need to set up environment variables.

1.  Create a `.env` file in the `backend` directory.
2.  Add the following variables:

    ```env
    # MongoDB Connection String (Must include database name)
    MONGODB_API_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority

    # Environment Mode (development or production)
    NODE_ENV=development

    # API Port (Optional, defaults to 8000)
    API_PORT=8000

    # Upstash Redis Configuration
    UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
    UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
    ```

## Getting Started 🚀

Check the `frontend` and `backend` directories for specific installation and running instructions.

## Production Build & Start 🏗️

To build and start the application for production:

1.  Build the application:
    ```bash
    npm run build
    ```

2.  Start the production server:
    ```bash
    npm run start
    ```
