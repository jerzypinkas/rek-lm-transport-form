<?php

namespace App\Controller;

use Carbon\Carbon;
use Pimcore\Model\DataObject;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use \Pimcore\Controller\FrontendController;

class ApiController extends FrontendController
{
    #[Route('/api', name: "get_transports", methods: ['GET'])]
    public function listAction(Request $request): Response
    {
        $data = [];
        $transports = new DataObject\TransportOrder\Listing;

        foreach ($transports as $key => $transport) {
            $items = [];
            $transportItems = $transport->getItems();

            if($transportItems) {
                foreach ($transport->getChildren() as $item) {
                    $items[] = [
                        'name' => $item->getName(),
                        'weight' => $item->getWeight(),
                        'cargoType' => $item->getCargo_type()
                    ];
                }
            }

            $data[$key] = array(
                "from" => $transport->getFrom(),
                "to" => $transport->getTo(),
                "date" => $transport->getDate(),
                'airplane' => $transport->getAirplane()->getName(),
                'items' => $items
            );
        }

        return $this->json(["success" => true, "data" => $data]);
    }

    #[Route('/api', name: "post_transport", methods: ['POST'])]
    public function postAction(Request $request): Response
    {
        $payload = json_decode($request->getContent(), true);

        $newTransport = new DataObject\TransportOrder();


        $newTransport->setKey($payload['from'] . '-' . $payload['to'] . uniqid());

        $newTransport->setParentId(1);

        $newTransport->setFrom($payload['from']);
        $newTransport->setTo($payload['to']);


        $airplanes = DataObject\Airplane::getByName($payload['airplane']);
        foreach ($airplanes as $airplane) {
            $newTransport->setAirplane(DataObject::getById($airplane->getId()));
        }

        $newTransport->setDate(Carbon::createFromFormat('Y-m-d', $payload['date']));
        $newTransport->setPublished(true);

        $newTransport->save();

        foreach ($payload['items'] as $item) {
            $newTransportItem = new DataObject\TransportItem();

            $newTransportItem->setParent($newTransport);
            $newTransportItem->setKey($item['name'] . '-' . uniqid());
            $newTransportItem->setName($item['name']);
            $newTransportItem->setWeight($item['weight']);
            $newTransportItem->setCargo_type($item['cargoType']);
            $newTransportItem->setPublished(true);
            $newTransportItem->save();

            $newTransport->setItems($newTransportItem);
        }



        $newTransport->save();

        return $this->json(["success" => true, "data" => $payload]);
    }
}
