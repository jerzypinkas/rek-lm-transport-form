<?php

namespace App\Controller;

use App\Api\TransportApi;
use App\Validation\TransportOrderPayload;
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
    public function postAction(Request $request, TransportApi $transportApi, TransportOrderPayload $validator): Response
    {
        $payload = json_decode($request->getContent(), true);

        $errors = $validator->validate($payload);
        if(!empty($errors)) {
            return $this->json(["success" => false, "data" => $errors], 422);
        }

        return $this->json(["success" => true, "data" => $transportApi->post($payload, $request->files->all())], 201);
    }
}
