<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class VehicleResource extends JsonResource
{
    
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=> $this->id,
            'model' => $this->model,
            'status' => $this->status,
            'type'=> $this->type,
            'capacity' => $this->capacity,
            'description' => $this->description,
            'image_path' => $this->image_path ? 
            Storage::url($this->image_path) : '',
            'license_plate' => $this->license_plate,
            'assignedUser' => $this->assignedUser ? new UserResource
            (resource: $this->assignedUser) : null,
            'createdBy' => new UserResource(resource: $this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
        ];
    }
}
