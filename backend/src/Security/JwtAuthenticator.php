<?php

namespace App\Security;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;
use App\Utility\ResponseHandler;
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

class JwtAuthenticator extends AbstractGuardAuthenticator
{
    private $em;
    private $params;

    public function __construct(EntityManagerInterface $em, ContainerBagInterface $params)
    {
        $this->em = $em;
        $this->params = $params;
    }

    public function start(Request $request, AuthenticationException $authException = null): Response
    {
        $response = new Response();
        return ResponseHandler::result($response, Response::HTTP_UNAUTHORIZED, 'Authentication Required');
    }

    public function supports(Request $request)
    {
        return $request->headers->has('x-access-token');
    }

    public function getCredentials(Request $request)
    {
        return $request->headers->get('x-access-token');
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        try {
            $decoded = JWT::decode(
                $credentials,
                new Key($this->params->get('jwt_secret'), 'HS256')
            );
            $payload = json_decode(json_encode($decoded), true);

            return $userProvider->loadUserByIdentifier($payload['user']);
        } catch (\Exception $exception) {
            throw new AuthenticationException($exception->getMessage());
        }
    }

    public function checkCredentials($credentials, UserInterface $user)
    {
        return true;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): Response
    {
        $response = new Response();
        return ResponseHandler::result($response, Response::HTTP_UNAUTHORIZED, $exception->getMessage());
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $providerKey)
    {
        return null;
    }

    public function supportsRememberMe()
    {
        return false;
    }
}
