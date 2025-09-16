<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;


class StudentController extends Controller
{
    public function create()
    {
        return view('students.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'   => 'required|string|max:255',
            'age'    => 'required|integer|min:1|max:100',
            'gender' => 'required|in:Male,Female',
        ]);

        Student::create($request->all());

        return redirect()->back()->with('success', 'Student registered successfully!');
    }

    // API endpoint for React frontend
    public function index()
    {
        return response()->json(Student::all());
    }
}
