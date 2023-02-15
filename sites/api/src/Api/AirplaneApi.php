<?php

namespace App\Api;

use Pimcore\Model\DataObject;

class AirplaneApi implements ApiInterface
{
    public function get(): array
    {
        $data = [];

        $airplanes = new DataObject\Airplane\Listing();

        foreach ($airplanes as $key => $airplane) {
            $data[$key] = [
                'name' => $airplane->getName(),
                'payload' => $airplane->getPayload(),
                'email' => $airplane->getEmail()
            ];
        }

        return $data;
    }

    public function getItem(string $name): array
    {
        $data = [];

        $airplanes = DataObject\Airplane::getByName($name);
        foreach ($airplanes as $airplane) {
            $data[] = [
                'id' => $airplane->getId(),
                'name' => $airplane->getName(),
                'payload' => $airplane->getPayload(),
                'email' => $airplane->getEmail()
            ];
        }

        return $data;
    }

    /**
     * @throws \Exception
     */
    public function post(array $items): array
    {
        $data = [];
        foreach ($items as $item) {
            $airplane = new DataObject\Airplane();

            $airplane->setKey(\Pimcore\Model\Element\Service::getValidKey($item['name'], 'object'));
            $airplane->setParentId(1);

            $airplane->setName($item['name']);
            $airplane->setPayload($item['payload']);
            $airplane->setEmail($item['email']);
            $airplane->setPublished(true);

            try {
                $airplane->save();
            } catch (\Exception $exception) {
                throw new \Exception('Transport order data save failed. ' . $exception->getMessage());
            }

            $data[] = $this->getItem($item['name']);
        }

        return $data;
    }
}
