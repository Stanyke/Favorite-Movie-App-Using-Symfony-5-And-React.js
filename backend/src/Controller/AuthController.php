<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Persistence\ManagerRegistry;
use App\Repository\UserRepository;
use App\Utility\ResponseHandler;
use App\Utility\Constants;
use App\Utility\Authentication;
use App\Service\UserService;

class AuthController extends AbstractController
{
    /**
     * @Route("/auth/register", name="register", methods={"POST"})
     */
    public function register(Request $request, UserPasswordHasherInterface $encoder, ManagerRegistry $doctrine, UserRepository $userRepository)
    {
        $response = new Response();
        $parameter = json_decode($request->getContent(), true);


        if (!$parameter || !array_key_exists("email", $parameter) || !array_key_exists("password", $parameter) || !array_key_exists("name", $parameter)) {
            return ResponseHandler::result($response, Response::HTTP_BAD_REQUEST, Constants::INVALID_REQUEST);
        }

        $email = strtolower($parameter['email']);
        $getUser = $userRepository->findOneBy([
            'email' => $email,
        ]);

        if ($getUser) {
            return ResponseHandler::result($response, Response::HTTP_CONFLICT, Constants::USER_EXISTS);
        }

        $user = (new UserService)->create($parameter, $encoder, $doctrine);

        $user = $userRepository->findOneBy([
            'email' => $email,
        ]);

        $token = (new Authentication)->encode([
            "user" => $user->getEmail(),
        ], $this->getParameter('jwt_secret'));

        $user = (new UserService)->getUser($user, $token);

        return ResponseHandler::result($response, Response::HTTP_CREATED, Constants::USER_REGISTERED, $user);
    }

    /**
     * @Route("/auth/login", name="login", methods={"POST"})
     */
    public function login(Request $request, UserRepository $userRepository, UserPasswordHasherInterface $encoder)
    {
        $response = new Response();
        $parameter = json_decode($request->getContent(), true);

        $email = strtolower($parameter['email']);
        $password = strtolower($parameter['password']);

        $user = $userRepository->findOneBy([
            'email' => $email,
        ]);

        if (!$user || !$encoder->isPasswordValid($user, $password)) {
            return ResponseHandler::result($response, Response::HTTP_UNAUTHORIZED, Constants::INVALID_CREDENTIALS);
        }

        $payload = [
            "user" => $user->getEmail(),
        ];
        $token = (new Authentication)->encode($payload, $this->getParameter('jwt_secret'));

        $user = (new UserService)->getUser($user, $token);

        return ResponseHandler::result($response, Response::HTTP_OK, Constants::USER_LOGIN, $user);
    }


    // public function login(Request $request, UserRepository $userRepository, UserPasswordHasherInterface $encoder)
    // {
    //     $user = $userRepository->findOneBy([
    //         'email' => $request->get('email'),
    //     ]);
    //     if (!$user || !$encoder->isPasswordValid($user, $request->get('password'))) {
    //         return $this->json([
    //             'message' => 'email or password is wrong.',
    //         ]);
    //     }
    //     $payload = [
    //         "user" => $user->getUserIdentifier(),
    //         "exp"  => (new \DateTime())->modify("+1 days")->getTimestamp(),
    //     ];


    //     $jwt = JWT::encode($payload, $this->getParameter('jwt_secret'), 'HS256');
    //     return $this->json([
    //         'message' => 'success!',
    //         'token' => sprintf('Bearer %s', $jwt),
    //     ]);
    // }
}
