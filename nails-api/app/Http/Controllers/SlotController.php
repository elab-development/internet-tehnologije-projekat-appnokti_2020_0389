<?php

namespace App\Http\Controllers;

use App\Http\Resources\SlotResource;
use App\Models\Slot;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SlotController extends AbstractController
{
    public function index(): JsonResponse
    {
        $slots = Slot::all();
        return $this->successResponse(SlotResource::collection($slots), 'Termini su uspešno učitani.');
    }

    public function show($id): JsonResponse
    {
        $slot = Slot::find($id);
        if ($slot) {
            return $this->successResponse(new SlotResource($slot), 'Termin je uspešno učitan.');
        } else {
            return $this->errorResponse('Termin nije pronađen.', [],404);
        }
    }

    public function freeSlots(Request $request): JsonResponse
    {
        $reservationDate = $request->input('reservation_date');

        $slots = Slot::whereDoesntHave('reservations', function ($query) use ($reservationDate) {
            $query->where('reservation_date', $reservationDate);
        })->get();

        return $this->successResponse(SlotResource::collection($slots), 'Slobodni termini su uspešno učitani.');
    }
}
