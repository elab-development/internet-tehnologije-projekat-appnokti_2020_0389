<?php

namespace App\Http\Resources;

use App\Models\Service;
use App\Models\Slot;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = User::find($this->user_id);
        $service = Service::find($this->service_id);
        $slot = Slot::find($this->slot_id);

        return [
            'id' => $this->id,
            'user' => new UserResource($user),
            'service' => new ServiceResource($service),
            'slot' => new SlotResource($slot),
            'reservation_date' => $this->reservation_date,
        ];
    }
}
