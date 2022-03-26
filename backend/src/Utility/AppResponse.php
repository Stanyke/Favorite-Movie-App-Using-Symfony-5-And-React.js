<?php

namespace App\Utility;

class ResponseHandler
{
    public static function result($response, $status, $message, $data = null)
    {
        $response->headers->set('Content-Type', 'application/json');

        $success = strval($status)[0] === '2' ? true : false;
        $response->setStatusCode($status);

        if ($data || $data === []) {
            $response->setContent(json_encode([
                'success' => $success,
                'message' => $message,
                'data' => $data
            ]));
        } else {
            $response->setContent(json_encode([
                'success' => $success,
                'message' => $message,
            ]));
        }

        return $response;
    }
}
