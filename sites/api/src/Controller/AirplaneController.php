<?php

namespace App\Controller;

use App\Api\AirplaneApi;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use \Pimcore\Controller\FrontendController;

#[Route('/api/airplanes')]
class AirplaneController extends FrontendController
{
    #[Route('', name: "get_airplanes", methods: ['GET'])]
    public function listAction(AirplaneApi $airplaneApi): Response
    {
        return $this->json(["success" => true, "data" => $airplaneApi->get()]);
    }

    #[Route('', name: "post_airplane", methods: ['POST'])]
    public function postAction(Request $request, AirplaneApi $airplaneApi): Response
    {
        $payload = json_decode($request->getContent(), true);

        return $this->json(["success" => true, "data" => $airplaneApi->post($payload['data'])], 201);
    }
}
