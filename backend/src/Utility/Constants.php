<?php

namespace App\Utility;

class Constants
{
    public const USER_REGISTERED = 'Registration successfully';
    public const USER_LOGIN = 'Login successful';
    public const INVALID_CREDENTIALS = 'Invalid credentials';
    public const USER_EXISTS = 'User already exists';
    public const INVALID_REQUEST = 'One or more filed is missing';
    public const USER_FETCHED = 'User fetched successfully';
    public const FETCHED = 'Resource fetched successfully';
    public const MOVIE_ADDED = 'Movie added to favorites';
    public const MOVIE_REMOVED = 'Movie removed from favorites';
    public const MOVIE_FETCHED = 'Favorite movies fetched';
    public const MOVIE_EXISTS = 'Movie already exists in favorites';
    public const MOVIE_NOT_EXISTS = 'Movie does not exists in favorites';
    public const USER_MOVIE_NOT_ALLOWED = 'User is not allowed to manage this movie';
}
