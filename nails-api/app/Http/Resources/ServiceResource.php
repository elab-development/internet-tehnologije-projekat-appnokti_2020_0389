<?php

namespace App\Http\Resources;

use App\Models\ServiceType;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'service_name' => $this->service_name,
            'service_description' => $this->service_description,
            'service_price' => $this->service_price,
            'service_type' => new ServiceTypeResource(ServiceType::find($this->service_type_id)),
        ];
    }
}
