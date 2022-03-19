# This is a brief summary of this application

- I created the endpoints for the following
  - Registering User with the help of auth manager on symfony.
    - Name: `Register User`
    - Method: `POST`
  - Logining in for user who have registered and provided a token to access other APIs.
    - Name: `User Login`
    - Method: `POST`
  - Getting a user's profile with authentication credentials provided.
    - Name: `Get Profile`
    - Method: `GET`
  - Adding a favorite movie when logged in.
    - Name: `Add Favorite Movie`
    - Method: `POST`
  - Deletign a favorite movie using the movie's id when logged in. However, the process gets to check if you have this particular movie in your favorites list before proceeding, since every movie saved is attached to a user.
    - Name: `Remove Favorite Movie`
    - Method: `DELETE`
  - Getting all favorites movies when logged in.
    - Name: `Get Favorite Movies`
    - Method: `GET`
  - Getting a particular favorite movie using the movie's id. The process checks if you've this movie in your favorites list before returning it.
    - Name: `Get Favorite Movies By Movie ID`
    - Method: `GET`

# Difficult To Do
- Nothing much, since i got familiar with the codebase and everything.
- However, i did encounter an issue with cors, on the external APIs. That was why i have to make use of `anywhere cors`

# To Do Differently
- Spending time to minize the codebase structure to be much more cleaner.

