<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student; // Make sure to import the Student model
use App\Models\Teacher; // Import Teacher model for cross-table validation

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::all();
        return response()->json($students);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        \Log::info('StudentController store called', $request->all());
        
        // Check if email exists in students table
        $studentEmailExists = Student::where('email', $request->email)->exists();
        
        // Check if email exists in teachers table
        $teacherEmailExists = Teacher::where('email', $request->email)->exists();
        
        if ($studentEmailExists) {
            return response()->json([
                'errors' => [
                    'email' => ['The email has already been taken by another student.']
                ]
            ], 422);
        }
        
        if ($teacherEmailExists) {
            return response()->json([
                'errors' => [
                    'email' => ['The email has already been taken by a teacher.']
                ]
            ], 422);
        }
        
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'course' => 'required'
        ]);

        $student = Student::create($request->all());

        return response()->json($student, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Not used in this application, but a good practice to include
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Check if email exists in students table (excluding current student)
        $studentEmailExists = Student::where('email', $request->email)->where('id', '!=', $id)->exists();
        
        // Check if email exists in teachers table
        $teacherEmailExists = Teacher::where('email', $request->email)->exists();
        
        if ($studentEmailExists) {
            return response()->json([
                'errors' => [
                    'email' => ['The email has already been taken by another student.']
                ]
            ], 422);
        }
        
        if ($teacherEmailExists) {
            return response()->json([
                'errors' => [
                    'email' => ['The email has already been taken by a teacher.']
                ]
            ], 422);
        }
        
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'course' => 'required'
        ]);

        $student = Student::find($id);

        if (!$student) {
            return response()->json(['error' => 'Student not found'], 404);
        }

        $student->update($request->all());

        return response()->json($student);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['error' => 'Student not found'], 404);
        }

        $student->delete();

        return response()->json(['message' => 'Student deleted successfully']);
    }
}