<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "image" => ['nullable', 'image'],
            "model" => ['required', 'string', 'max:255'], // Ensure the model is a required string with a max length of 255 characters.
            "description" => ['nullable', 'string'], // Optional long text field, can be null.
            "license_plate" => ['required', 'string', 'max:255'], // Required, unique across vehicles.
            "type" => ['required', 'string', 'in:sedan,suv,truck,van,bike,other'], // Required, must be one of the predefined types.
            "capacity" => ['required', 'integer', 'min:1', 'max:50'],
        ];
    }
}
