<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends AbstractController
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Morate poslati email i password.', $validator->errors(), 400);
        }

        $credentials = $request->only('email', 'password');

        if (!auth()->attempt($credentials)) {
            return $this->errorResponse('Pogrešan email ili password.', [], 401);
        }

        $user = auth()->user();

        $token = $user->createToken('authToken')->plainTextToken;

        return $this->successResponse([
            'user' => $user,
            'token' => $token
        ], 'Uspešno ste se prijavili.');
    }

    public function logout()
    {
        //delete current token
        auth()->user()->tokens()->delete();

        return $this->successResponse([], 'Uspešno ste se odjavili.');
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
            'name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validacija nije uspela.', $validator->errors(), 400);
        }

        $user = User::create([
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'name' => $request->name,
            'role' => 'user'
        ]);

        return $this->successResponse(new UserResource($user), 'Uspešno ste se registrovali.', 201);
    }
}
