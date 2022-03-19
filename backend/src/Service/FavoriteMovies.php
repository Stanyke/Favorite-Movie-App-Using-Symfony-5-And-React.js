<?php

namespace App\Service;

use App\Entity\FavoriteMovies;

class FavoriteMoviesService
{

    public function add($parameter, $doctrine)
    {
        $movie = new FavoriteMovies();

        $userUniqueId = $parameter['user_unique_id'];
        $movieId = $parameter['movie_id'];

        $movie->setUserUniqueId($userUniqueId);
        $movie->setMovieId($movieId);
        $em = $doctrine->getManager();
        $em->persist($movie);
        $em->flush();

        return true;
    }

    public function remove($movie, $doctrine)
    {
        $em = $doctrine->getManager();
        $em->remove($movie);
        $em->flush();

        return true;
    }

    public function getMovies($favoriteMoviesRepository, $filter)
    {
        $movies = $favoriteMoviesRepository->findAll($filter);

        $data = [];

        foreach ($movies as $movie) {
            $data[] = [
                'id' => $movie->getId(),
                'movie_id' => $movie->getMovieId(),
            ];
        }

        $data = array_reverse($data);

        return $data;
    }
}
