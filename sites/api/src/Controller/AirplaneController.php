<?php

namespace App\Controller;

use Pimcore\Model\DataObject;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use \Pimcore\Controller\FrontendController;

class AirplaneController extends FrontendController
{
    #[Route('/api/airplanes', name: "get_airplanes", methods: ['GET'])]
    public function listAction(Request $request): Response
    {
        $data = [];
        $airplanes = new DataObject\Airplane\Listing();

        foreach ($airplanes as $key => $airplane) {
            $data[$key] = [
                "name" => $airplane->getName(),
                "payload" => $airplane->getPayload()
            ];
        }

        return $this->json(["success" => true, "data" => $data]);
    }
}
