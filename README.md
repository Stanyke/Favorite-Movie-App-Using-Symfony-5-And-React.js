# Favorite Movie App Using Symfony 5 And React.js

This is an application build with symfony 5 (backend for restful APIs) and React.js (frontend), for storage of favorite movies using the omdb API and mysql to keep track of users and auth.

# How To Use This App
- Clone the repository
- Go into the backend folder and install the necessary dependencies using `yarn add` command
- Then goto the frontend directory and run `yarn add` command too
- Add a `.env` file inside the frontend folder (root directory), the following are the variables needed.
 - REACT_APP_SERVER_URL, this is the url of the server e.g (`http://localhost:8000`), note it does not have an ending slash.
 - REACT_APP_AFTER_LOGIN_REDIRECT_URL, this is url of the dashboard or page after user login e.g (`/dashboard`)
 - REACT_APP_BEFORE_LOGIN_REDIRECT_URL, this is url of the authentication page e.g (`/`)
 - REACT_APP_PLATFORM_NAME, this is the name of the application e.g. `Favorite Movies`

- Here is the url to the local documentation of the APIs on postman, https://documenter.getpostman.com/view/12673071/UVsPQQdT

## Thank You, I hope you enjoy this project
