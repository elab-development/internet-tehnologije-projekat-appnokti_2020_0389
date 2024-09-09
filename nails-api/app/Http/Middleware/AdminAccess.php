<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        //mora biti pozvana posle sanctuma jer onda ima u Auth-u user id
        $user_id = Auth::id();

        $user = null;

        if ($user_id) {
            $user = User::find($user_id);
        }

        if (!$user || $user->role !== 'admin') {
            return response()->json(['message' => 'Nemate pristup ovoj stranici.'], 403);
        }

        return $next($request);
    }
}
