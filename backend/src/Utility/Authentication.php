<?php

namespace App\Utility;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

class Authentication extends AbstractController
{

    public function encode($payload, $secret)
    {
        $jwt = JWT::encode($payload, $secret, 'HS256');
        return $jwt;
    }

    public function decode($payload, $secret)
    {
        $decoded = JWT::decode(
            $payload,
            new Key($secret, 'HS256')
        );
        return json_decode(json_encode($decoded), true);
    }
}
