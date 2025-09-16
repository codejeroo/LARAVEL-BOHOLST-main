<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\Student; // Import Student model for cross-table validation
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teachers = Teacher::all();
        return response()->json($teachers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Check if email exists in teachers table
        $teacherEmailExists = Teacher::where('email', $request->email)->exists();
        
        // Check if email exists in students table
        $studentEmailExists = Student::where('email', $request->email)->exists();
        
        if ($teacherEmailExists) {
            return response()->json([
                'errors' => [
                    'email' => ['The email has already been taken by another teacher.']
                ]
            ], 422);
        }
        
        if ($studentEmailExists) {
            return response()->json([
                'errors' => [
                    'email' => ['The email has already been taken by a student.']
                ]
            ], 422);
        }
        
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'subject' => 'required|string|max:255',
        ]);

        $teacher = Teacher::create($validatedData);

        return response()->json($teacher, 201);
    }

    /**
     * Update the specified resource in storage.
     * HTTP Method: PUT/PATCH
     * URL: /teachers/{teacher}
     */
    public function update(Request $request, Teacher $teacher)
    {
        // Check if email exists in teachers table (excluding current teacher)
        $teacherEmailExists = Teacher::where('email', $request->email)->where('id', '!=', $teacher->id)->exists();
        
        // Check if email exists in students table
        $studentEmailExists = Student::where('email', $request->email)->exists();
        
        if ($teacherEmailExists) {
            return response()->json([
                'errors' => [
                    'email' => ['The email has already been taken by another teacher.']
                ]
            ], 422);
        }
        
        if ($studentEmailExists) {
            return response()->json([
                'errors' => [
                    'email' => ['The email has already been taken by a student.']
                ]
            ], 422);
        }
        
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'subject' => 'required|string|max:255',
        ]);

        $teacher->update($validatedData);

        return response()->json($teacher);
    }

    /**
     * Remove the specified resource from storage.
     * HTTP Method: DELETE
     * URL: /teachers/{teacher}
     */
    public function destroy(Teacher $teacher)
    {
                $teacher->delete();
        return response()->json(['message' => 'Teacher deleted successfully']);
    }
}
