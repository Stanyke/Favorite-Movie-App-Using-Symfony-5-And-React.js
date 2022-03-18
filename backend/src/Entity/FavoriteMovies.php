<?php

namespace App\Entity;

use App\Repository\FavoriteMoviesRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=FavoriteMoviesRepository::class)
 * @ORM\Table(name="`favorite_movie`")
 */
class FavoriteMovies
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=250, unique=true)
     */
    private $user_unique_id;

    /**
     * @ORM\Column(type="string", length=250, unique=true)
     */
    private $movie_id;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserUniqueId(): ?string
    {
        return $this->user_unique_id;
    }

    public function setUserUniqueId(string $user_unique_id): self
    {
        $this->user_unique_id = $user_unique_id;

        return $this;
    }

    public function getMovieId(): ?string
    {
        return $this->movie_id;
    }

    public function setMovieId(string $movie_id): self
    {
        $this->movie_id = $movie_id;

        return $this;
    }
}
