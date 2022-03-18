<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Repository\UserRepository;
use App\Repository\FavoriteMoviesRepository;
use App\Utility\Authentication;
use App\Service\UserService;
use App\Service\FavoriteMoviesService;
use App\Utility\ResponseHandler;
use App\Utility\Constants;

class ApiController extends AbstractController
{
    /**
     * @Route("/api/me", name="me", methods={"GET"})
     */
    public function me(Request $request, UserRepository $userRepository): Response
    {
        $response = new Response();
        $authToken = $request->headers->get('x-access-token');

        $token = (new Authentication)->decode($authToken, $this->getParameter('jwt_secret'));

        $user = $userRepository->findOneBy([
            'email' => $token['user'],
        ]);

        $user = (new UserService)->getUser($user);

        return ResponseHandler::result($response, Response::HTTP_OK, Constants::USER_FETCHED, $user);
    }

    /**
     * @Route("/api/movies/favorite", name="addFavoriteMovie", methods={"POST"})
     */
    public function addFavoriteMovie(Request $request, UserRepository $userRepository, FavoriteMoviesRepository $favoriteMoviesRepository, ManagerRegistry $doctrine): Response
    {
        $response = new Response();
        $authToken = $request->headers->get('x-access-token');
        $parameter = json_decode($request->getContent(), true);

        if (!$parameter || !array_key_exists("movie_id", $parameter)) {
            return ResponseHandler::result($response, Response::HTTP_BAD_REQUEST, Constants::INVALID_REQUEST);
        } else if (empty($parameter['movie_id'])) {
            return ResponseHandler::result($response, Response::HTTP_BAD_REQUEST, Constants::INVALID_REQUEST);
        }

        //check if movie already exists
        $getMovie = $favoriteMoviesRepository->findOneBy([
            'movie_id' => $parameter['movie_id']
        ]);

        if ($getMovie) return ResponseHandler::result($response, Response::HTTP_CONFLICT, Constants::MOVIE_EXISTS);

        $token = (new Authentication)->decode($authToken, $this->getParameter('jwt_secret'));

        $user = $userRepository->findOneBy([
            'email' => $token['user'],
        ]);

        $user = (new UserService)->getUser($user);

        $parameter['user_unique_id'] = $user['unique_id'];

        (new FavoriteMoviesService)->add($parameter, $doctrine);

        return ResponseHandler::result($response, Response::HTTP_OK, Constants::MOVIE_ADDED);
    }

    /**
     * @Route("/api/movies/favorite", name="removeFavoriteMovie", methods={"DELETE"})
     */
    public function removeFavoriteMovie(Request $request, UserRepository $userRepository, FavoriteMoviesRepository $favoriteMoviesRepository, ManagerRegistry $doctrine): Response
    {
        $response = new Response();
        $authToken = $request->headers->get('x-access-token');
        $parameter = json_decode($request->getContent(), true);

        if (!$parameter || !array_key_exists("movie_id", $parameter)) {
            return ResponseHandler::result($response, Response::HTTP_BAD_REQUEST, Constants::INVALID_REQUEST);
        } else if (empty($parameter['movie_id'])) {
            return ResponseHandler::result($response, Response::HTTP_BAD_REQUEST, Constants::INVALID_REQUEST);
        }

        //check if movie already exists
        $getMovie = $favoriteMoviesRepository->findOneBy([
            'movie_id' => $parameter['movie_id']
        ]);

        if (!$getMovie) return ResponseHandler::result($response, Response::HTTP_BAD_REQUEST, Constants::MOVIE_NOT_EXISTS);

        $token = (new Authentication)->decode($authToken, $this->getParameter('jwt_secret'));

        $user = $userRepository->findOneBy([
            'email' => $token['user'],
        ]);

        $user = (new UserService)->getUser($user);

        if ($getMovie->getUserUniqueId() !== $user['unique_id']) return ResponseHandler::result($response, Response::HTTP_UNAUTHORIZED, Constants::USER_MOVIE_NOT_ALLOWED);

        (new FavoriteMoviesService)->remove($getMovie, $doctrine);

        return ResponseHandler::result($response, Response::HTTP_OK, Constants::MOVIE_REMOVED);
    }

    /**
     * @Route("/api/movies/favorite", name="getFavoriteMovies", methods={"GET"})
     */
    public function getFavoriteMovies(Request $request, UserRepository $userRepository, FavoriteMoviesRepository $favoriteMoviesRepository): Response
    {
        $response = new Response();
        $authToken = $request->headers->get('x-access-token');

        $token = (new Authentication)->decode($authToken, $this->getParameter('jwt_secret'));

        $user = $userRepository->findOneBy([
            'email' => $token['user'],
        ]);

        $user = (new UserService)->getUser($user);

        $movies = (new FavoriteMoviesService)->getMovies($favoriteMoviesRepository, [
            'user_unique_id' => $user['unique_id']
        ]);

        return ResponseHandler::result($response, Response::HTTP_OK, Constants::MOVIE_FETCHED, $movies);
    }
}
