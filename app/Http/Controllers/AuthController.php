<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        if(!Auth::attempt($credentials)) {
            return response()->json(null, 401);
        }

        $request->session()->regenerate();

        return response()->json(null, 200);
    }

    public function logout() {
        Auth::guard('web')->logout();

        return response()->json(null, 200);
    }

    public function user() {
        return response()->json(
            auth()->user()
        );
    }
}
