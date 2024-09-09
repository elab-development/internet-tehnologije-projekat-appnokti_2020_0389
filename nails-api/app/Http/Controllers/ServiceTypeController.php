<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServiceTypeResource;
use App\Models\ServiceType;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ServiceTypeController extends AbstractController
{
    public function index(): JsonResponse
    {
        $serviceTypes = ServiceType::all();
        return $this->successResponse(ServiceTypeResource::collection($serviceTypes), 'Tipovi usluga su uspešno učitani.');
    }

    public function show($id): JsonResponse
    {
        $serviceType = ServiceType::find($id);
        if ($serviceType) {
            return $this->successResponse(new ServiceTypeResource($serviceType), 'Tip usluge je uspešno učitan.');
        } else {
            return $this->errorResponse('Tip usluge nije pronađen.', [], 404);
        }
    }
}
