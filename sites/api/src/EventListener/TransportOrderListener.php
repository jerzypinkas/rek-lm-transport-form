<?php

namespace App\EventListener;

use Pimcore\Event\Model\ElementEventInterface;
use Pimcore\Event\Model\DataObjectEvent;
use Psr\Log\LoggerInterface;

class TransportOrderListener
{
    private $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function onPostAdd (ElementEventInterface $e)
    {
        if ($e instanceof DataObjectEvent) {
            $transportOrder = $e->getObject();

            if(
                get_class($transportOrder) === 'Pimcore\Model\DataObject\TransportOrder'
            ) {
                try {
                    $airplane = $transportOrder->getAirplane();

                    $mail = new \Pimcore\Mail();
                    $mail->to($airplane->getEmail());
                    $mail->subject("New order: " . $transportOrder->getFrom() . " - " . $transportOrder->getTo());

                    $mail->setParams([
                        'from' => $transportOrder->getFrom(),
                        'to' => $transportOrder->getTo(),
                        'date' => $transportOrder->getDate(),
                        'airplane' => $airplane->getName(),
                    ]);
                    $mail->html(
                        '<H1 style="font-size: 20px;">New AirCargo Transport Order</H1>
                              <p>From: <b>{{ from }}</b></p>
                              <p>To: <b>{{ to }}</b></p>
                              <p>Date: <b>{{ date }}</b></p>
                              <p>Airplane: <b>{{ airplane }}</b></p>
                              '
                    );
                    $mail->send();
                } catch (\Exception $exception) {
                    $this->logger->critical('Email send failed: ' . $exception->getMessage());
                }

            }

        }
    }
}
