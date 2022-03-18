<?php

namespace App\Service;

use App\Entity\User;

class UserService
{

    public function create($parameter, $encoder, $doctrine)
    {
        $user = new User();

        $name = $parameter['name'];
        $password = $parameter['password'];
        $email = strtolower($parameter['email']);

        $user->setPassword($encoder->hashPassword($user, $password));
        $user->setName($name);
        $user->setEmail($email);
        $user->setUniqueId(uniqid());
        $em = $doctrine->getManager();
        $em->persist($user);
        $em->flush();

        return true;
    }

    public function getUser($user, $token = null)
    {
        if ($token) {
            return [
                'name' => $user->getName(),
                'unique_id' => $user->getUniqueId(),
                'email' => $user->getEmail(),
                'token' => $token
            ];
        }
        return [
            'name' => $user->getName(),
            'unique_id' => $user->getUniqueId(),
            'email' => $user->getEmail(),
        ];
    }
}
