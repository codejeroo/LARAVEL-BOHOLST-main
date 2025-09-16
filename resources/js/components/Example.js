import React from 'react';
import { Link } from 'react-router-dom';

function Example() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">School Management Dashboard</h1>
                <div className="space-y-6">
                    <Link to="/students" className="block w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-xl hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-lg">
                        Manage Students
                    </Link>
                    <Link to="/teachers" className="block w-full bg-purple-600 text-white font-bold py-4 px-6 rounded-lg text-xl hover:bg-purple-700 transition duration-300 transform hover:scale-105 shadow-lg">
                        Manage Teachers
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Example;




