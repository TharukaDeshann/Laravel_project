<?php

namespace App\Enum;

enum RolesEnum: string
{
    case Admin = 'admin';
    case Driver = 'driver';

    public static function labels() : array
    {
        return [
            self::Admin->value => 'Admin',
            self::Driver->value => 'Driver',
        ];
    }

    public function label()
    {
        return match($this){
            self::Admin => 'Admin',
            self::Driver => 'Driver',
        };
    }
}
