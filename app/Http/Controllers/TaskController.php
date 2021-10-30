<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index() {
        $result = Task::with(['user'])
            ->get();

        return response()->json($result, 200);
    }

    public function store(Request $request) {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:65535',
        ]);

        $result = Task::create([
            'user_id' => auth()->user()->id,
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return response()->json($result, 201);
    }

    public function show($id) {
        $result = Task::where('id', $id)
            ->first();

        if(!$result) {
            return response()->json(null, 404);
        }

        return response()->json($result, 200);
    }

    public function destroy($id) {
        $result = Task::where('id', $id)
            ->where('user_id', auth()->user()->id)
            ->first();

        if(!$result) {
            return response()->json(null, 404);
        }

        $result->delete();

        return response()->json(null, 204);
    }
}
