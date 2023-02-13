<?php

namespace App\Api;

use Carbon\Carbon;
use Pimcore\Model\DataObject;

class TransportApi implements ApiInterface
{
    public function get(): array
    {
        return $this->searchItems();
    }

    public function getItem(string $name): array
    {
        return $this->searchItems($name)[0];
    }

    private function searchItems(?int $id = null): array
    {
        $data = [];
        $transports = (!$id) ? new DataObject\TransportOrder\Listing : [DataObject\TransportOrder::getById($id)];

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

        return $data;
    }

    /**
     * @throws \Exception
     */
    public function post(array $items): array
    {
        $data = [];

        $newTransport = new DataObject\TransportOrder();

        $key = $items['from'] . '-' . $items['to'] . uniqid();
        $newTransport->setKey($key);
        $newTransport->setParentId(1);

        $newTransport->setFrom($items['from']);
        $newTransport->setTo($items['to']);

        $airplanes = DataObject\Airplane::getByName($items['airplane']);
        foreach ($airplanes as $airplane) {
            $newTransport->setAirplane(DataObject::getById($airplane->getId()));
        }

        $newTransport->setDate(Carbon::createFromFormat('Y-m-d', $items['date']));
        $newTransport->setPublished(true);

        try {
            $newTransport->save();
        } catch (\Exception $exception) {
            throw new \Exception('Transport order data save failed.');
        }

        foreach ($items['items'] as $item) {
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

        try {
            $newTransport->save();
        } catch (\Exception $exception) {
            throw new \Exception('Transport order items save failed.');
        }

        $data[] = $this->getItem($newTransport->getId());

        return $data;
    }
}
