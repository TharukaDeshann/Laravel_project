<?php

namespace App\Enum;

enum PermissionsEnum: string
{
    case ManageFeatures = 'manage_features';
    case ManageDrivers = 'manage_drivers';
    case  ManageVehicles = 'manage_vehicles';
}
