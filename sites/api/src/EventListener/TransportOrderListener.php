<?php

namespace App\EventListener;

use Pimcore\Event\Model\ElementEventInterface;
use Pimcore\Event\Model\DataObjectEvent;
use Psr\Log\LoggerInterface;
use function Sabre\Event\Loop\instance;

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
                    $mail = new \Pimcore\Mail();
                    $mail->to('jerzy@pinkas.pl');

                    $mail->setParams([
                        'from' => $transportOrder->getFrom(),
                        'to' => $transportOrder->getTo(),
                        'date' => $transportOrder->getDate(),
                        'airplane' => $transportOrder->getAirplane(),
                    ]);
                    $mail->html(
                        "<H1>New TransportOrder</H1>
                              <p>From: {{ from }} </p>
                              <p>To: {{ to }} </p>
                              <p>Date: {{ date }} </p>
                              <p>Airplane: {{ airplane }} </p>
                              "
                    );
                    $mail->send();
                } catch (\Exception $exception) {
                    $this->logger->critical('Email send failed: ' . $exception->getMessage());
                }

            }

        }
    }
}
