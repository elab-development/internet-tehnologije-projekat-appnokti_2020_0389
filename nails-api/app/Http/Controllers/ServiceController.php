<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ServiceController extends AbstractController
{
    //index, show, store, update, destroy

    public function index(): JsonResponse
    {
        $services = Service::all();
        return $this->successResponse(ServiceResource::collection($services), 'Usluge su uspešno učitane.');
    }

    public function show($id): JsonResponse
    {
        $service = Service::find($id);
        if ($service) {
            return $this->successResponse(new ServiceResource($service), 'Usluga je uspešno učitana.');
        } else {
            return $this->errorResponse('Usluga nije pronađena.', [], 404);
        }
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'service_name' => 'required|string',
            'service_description' => 'required|string',
            'service_type_id' => 'required|integer',
            'service_price' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validacija nije uspela.', $validator->errors(), 400);
        }

        $service = Service::create($request->all());

        return $this->successResponse(new ServiceResource($service), 'Usluga je uspešno sačuvana.', 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $service = Service::find($id);
        if (!$service) {
            return $this->errorResponse('Usluga nije pronađena.', [], 404);
        }

        $validator = Validator::make($request->all(), [
            'service_name' => 'required|string',
            'service_description' => 'required|string',
            'service_type_id' => 'required|integer',
            'service_price' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validacija nije uspela.', $validator->errors(), 400);
        }

        $service->update($request->all());

        return $this->successResponse(new ServiceResource($service), 'Usluga je uspešno ažurirana.');
    }

    public function destroy($id): JsonResponse
    {
        $service = Service::find($id);
        if (!$service) {
            return $this->errorResponse('Usluga nije pronađena.', [], 404);
        }

        $service->delete();

        return $this->successResponse([], 'Usluga je uspešno obrisana.');
    }

    public function findByServiceType(Request $request, $serviceTypeId): JsonResponse
    {
        $services = Service::where('service_type_id', $serviceTypeId)->get();
        return $this->successResponse(ServiceResource::collection($services), 'Usluge su uspešno učitane.');
    }
}
