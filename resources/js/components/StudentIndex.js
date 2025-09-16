import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StudentIndex = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/students', {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setStudents(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            fetch(`/students/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })
            .then(() => {
                setStudents(students.filter(student => student.id !== id));
            })
            .catch(error => console.error('Error deleting student:', error));
        }
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;

    return (
        <div className="bg-gray-100 p-8 min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Students</h1>
                    <div className="space-x-4">
                        <Link to="/" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors">Back to Home</Link>
                        <Link to="/students/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Add New Student</Link>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {students.map(student => (
                                <tr key={student.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <Link to={`/students/${student.id}/edit`} className="text-indigo-600 hover:text-indigo-900 transition-colors no-underline">Edit</Link>
                                        <button onClick={() => handleDelete(student.id)} className="text-red-600 hover:text-red-900 transition-colors">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentIndex;