<?php

namespace App\Validation;

use App\Api\AirplaneApi;
use DateTime;
use DateTimeZone;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class TransportOrderPayload
{
    private $airplanes;
    private ValidatorInterface $validator;

    public function __construct(AirplaneApi $airplaneApi, ValidatorInterface $validator)
    {
        $this->airplanes = $airplaneApi->get();
        $this->validator = $validator;
    }
    public function validate(array $payload)
    {
        $messages = [];

        $payload['total_items_weight'] = array_sum(array_column($payload['items'], 'weight'));
        unset($payload['items']);
        $payload['is_working_day_and_not_delayed'] = $this->isWorkingDayAndNotDelayed($payload['date']);
        $airplanePayload = $this->airplanes[array_search($payload['airplane'], array_column($this->airplanes, 'name'))]['payload'];

        $constraint = new Assert\Collection([
            "from" => new Assert\NotBlank(),
            "to" => new Assert\NotBlank(),
            "date" => [new Assert\Date(), new Assert\NotBlank()],
            "is_working_day_and_not_delayed" => new Assert\EqualTo(value: true, message: "Date is not working day or is a past date."),
            "airplane" => new Assert\Choice(
                choices: array_column($this->airplanes, 'name'),
                message: "The airplane you selected is not a valid choice"
            ),
            "total_items_weight" => new Assert\LessThanOrEqual(
                value: $airplanePayload,
                message: "Total weight of items is greater then the airplane payload ($airplanePayload)"
            )
        ]);

        $errors = $this->validator->validate($payload, $constraint);

        foreach ($errors as $error) {
            $messages[] = $error->getPropertyPath()  . ' ( ' . $error->getInvalidValue() . '): ' . $error->getMessage();
        }

        return $messages;
    }

    private function isWorkingDayAndNotDelayed($date): bool
    {
        $checkDate = DateTime::createFromFormat("Y-m-d", $date, new DateTimeZone("Europe/Warsaw"));

        if(!$checkDate) {
            return false;
        }

        $now = new DateTime("now", new DateTimeZone("Europe/Warsaw"));

        if((int) $checkDate->format("Ymd") < (int) $now->format("Ymd")) {
            return false;
        }

        return $checkDate->format('N') < 6;
    }
}
