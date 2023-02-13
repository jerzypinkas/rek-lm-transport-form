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

    #[Route('/api/airplanes', name: "post_airplane", methods: ['POST'])]
    public function postAction(): Response
    {

        $airplane1 = new DataObject\Airplane();

//        $airplane1->setKey('Airbus A380');
        $airplane1->setKey(\Pimcore\Model\Element\Service::getValidKey('Airbus A380', 'object'));
        $airplane1->setParentId(1);

        $airplane1->setName('Airbus A380');
        $airplane1->setPayload(35000);
        $airplane1->setPublished(true);

        $airplane1->save();

        $airplane2 = new DataObject\Airplane();

//        $airplane2->setKey('Boeing 747');
        $airplane2->setKey(\Pimcore\Model\Element\Service::getValidKey('Boeing 747', 'object'));
        $airplane2->setParentId(1);

        $airplane2->setName('Boeing 747');
        $airplane2->setPayload(38000);
        $airplane2->setPublished(true);

        $airplane2->save();

        return $this->json(["success" => true, "data" => '']);
    }
}
