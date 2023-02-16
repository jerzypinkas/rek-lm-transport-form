<?php

namespace App\Api;

interface ApiInterface
{
    public function get(): array;
    public function post(array $items, array $files): array;
    public function getItem(string $name): array;
}
