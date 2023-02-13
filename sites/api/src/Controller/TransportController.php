<?php

namespace App\Controller;

use App\Api\TransportApi;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use \Pimcore\Controller\FrontendController;

#[Route('/api/transports')]
class TransportController extends FrontendController
{
    #[Route('', name: "get_transports", methods: ['GET'])]
    public function listAction(TransportApi $transportApi): Response
    {
        return $this->json(["success" => true, "data" => $transportApi->get()]);
    }

    #[Route('', name: "post_transports", methods: ['POST'])]
    public function postAction(Request $request, TransportApi $transportApi): Response
    {
        $payload = json_decode($request->getContent(), true);

        return $this->json(["success" => true, "data" => $transportApi->post($payload)], 201);
    }
}
