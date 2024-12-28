<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserCreateController extends Controller
{
    public function create()
    {
        return inertia("User/Create");
    }
}
