import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StudentCreate = () => {
    const navigate = useNavigate();
    const [student, setStudent] = useState({ name: '', email: '', course: '' });
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
    fetch('/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(student)
        })
        .then(res => {
            if (res.ok) {
                navigate('/students', { replace: true });
                window.location.reload();
            } else {
                return res.json().then(data => setErrors(data.errors ? Object.values(data.errors).flat() : []));
            }
        })
        .catch(error => console.error('Error creating student:', error));
    };

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Add New Student</h1>
                    <Link to="/students" className="text-gray-500 hover:text-gray-700 no-underline">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Link>
                </div>

                {errors.length > 0 && (
                    <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
                        <p className="font-bold">Please fix the following errors:</p>
                        <ul className="mt-1 list-disc list-inside">
                            {errors.map((error, index) => <li key={index}>{error}</li>)}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={student.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition ease-in-out duration-150"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={student.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition ease-in-out duration-150"
                        />
                    </div>

                    <div>
                        <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
                        <input
                            type="text"
                            name="course"
                            id="course"
                            value={student.course}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition ease-in-out duration-150"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-150"
                    >
                        Add Student
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentCreate;