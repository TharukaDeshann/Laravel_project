<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            "model" => [ 'required','string', 'max:255'],
            "assigned_user_id" => ['nullable', 'exists:users,id'],
            "status" => [ 'required', Rule::in('Active' , 'Inactive')],
            "description" => ['nullable', 'string'], 
            "license_plate" => ['required', 'max:255'], 
            "type" => ['required', 'string'], 
            "capacity" => ['required', 'integer', 'min:1', 'max:50']        ];
    }
}
