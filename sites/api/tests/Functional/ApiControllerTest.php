<?php

declare(strict_types=1);

namespace Tests\App\Controller;

use Pimcore\Test\WebTestCase;

class ApiControllerTest extends WebTestCase
{
    public function testAirplaneApi()
    {

        $client = static::createClient();

        $crawlerPost = $client->request('POST', '/api/airplanes');

        $responsePost = $client->getResponse();

        $this->assertTrue($responsePost->isSuccessful(), 'response status is 2xx');


        $crawlerGet = $client->request('GET', '/api/airplanes');

        $responseGet = $client->getResponse()->getContent();

        $this->assertEquals(
            $responseGet,
            '
                {
                    "name": "Kartuzy",
                    "to": "Katowice",
                    "date": "2021-11-17",
                    "name": "Airbus A380",
                    "items": [
                        {
                            "name": "Kuchenka",
                            "weight": 20,
                            "cargoType": "normal"
                        },
                        {
                            "name": "Zmywarka",
                            "weight": 16,
                            "cargoType": "dangerous"
                        }
                    ]
                }
            '
        );
    }
}
