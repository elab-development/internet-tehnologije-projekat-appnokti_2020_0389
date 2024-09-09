<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ReservationController extends AbstractController
{
    //make api resource for reservation

    public function index()
    {
        $reservations = Reservation::all();
        return $this->successResponse(ReservationResource::collection($reservations), 'Rezervacije su uspešno učitane.');
    }

    public function show($id)
    {
        $reservation = Reservation::find($id);
        if ($reservation) {
            return $this->successResponse(new ReservationResource($reservation), 'Rezervacija je uspešno učitana.');
        } else {
            return $this->errorResponse('Rezervacija nije pronađena.', [], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'service_id' => 'required|integer',
            'slot_id' => 'required|integer',
            'reservation_date' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validacija nije uspela.', $validator->errors(), 400);
        }

        $reservation = Reservation::create($request->all());
        return $this->successResponse(new ReservationResource($reservation), 'Rezervacija je uspešno sačuvana.', 201);
    }

    public function update(Request $request, $id)
    {
        $reservation = Reservation::find($id);
        if (!$reservation) {
            return $this->errorResponse('Rezervacija nije pronađena.', [], 404);
        }

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'service_id' => 'required|integer',
            'slot_id' => 'required|integer',
            'reservation_date' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validacija nije uspela.', $validator->errors(), 400);
        }

        $reservation->update($request->all());
        return $this->successResponse(new ReservationResource($reservation), 'Rezervacija je uspešno ažurirana.');
    }

    public function destroy($id)
    {
        $reservation = Reservation::find($id);
        if ($reservation) {
            $reservation->delete();
            return $this->successResponse([], 'Rezervacija je uspešno obrisana.');
        } else {
            return $this->errorResponse('Rezervacija nije pronađena.', [], 404);
        }
    }

    public function getReservationsByUserId($userId)
    {
        $reservations = Reservation::where('user_id', $userId)->orderBy('reservation_date', 'desc')->get();
        return $this->successResponse(ReservationResource::collection($reservations), 'Rezervacije su uspešno učitane.');
    }

    public function getReservationsByServiceId($serviceId)
    {
        $reservations = Reservation::where('service_id', $serviceId)->get();
        return $this->successResponse(ReservationResource::collection($reservations), 'Rezervacije su uspešno učitane.');
    }

    public function paginateReservations(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $reservations = DB::table('reservations')
            ->join('users', 'reservations.user_id', '=', 'users.id')
            ->join('services', 'reservations.service_id', '=', 'services.id')
            ->join('slots', 'reservations.slot_id', '=', 'slots.id')
            ->select('reservations.*', 'users.name', 'services.service_name', 'slots.time_slot')
            ->paginate($perPage);

        return $this->successResponse($reservations, 'Rezervacije su uspešno učitane.');
    }

    public function getReservationsPerSlotTime(Request $request)
    {
        $reservations = DB::table('reservations')
            ->join('slots', 'reservations.slot_id', '=', 'slots.id')
            ->select('slots.time_slot', DB::raw('count(*) as total_reservations'))
            ->groupBy('slots.time_slot')
            ->get();

        return $this->successResponse($reservations, 'Rezervacije po terminima su uspešno učitane.');
    }
}
