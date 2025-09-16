import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TeacherIndex = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/teachers', {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setTeachers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching teachers:', error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            fetch(`/teachers/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })
            .then(() => {
                setTeachers(teachers.filter(teacher => teacher.id !== id));
            })
            .catch(error => console.error('Error deleting teacher:', error));
        }
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;

    return (
        <div className="bg-gray-100 p-8 min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Teachers</h1>
                    <div className="space-x-4">
                        <Link to="/" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors">Back to Home</Link>
                        <Link to="/teachers/create" className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">Add New Teacher</Link>
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
                            {teachers.map(teacher => (
                                <tr key={teacher.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{teacher.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <Link to={`/teachers/${teacher.id}/edit`} className="text-indigo-600 hover:text-indigo-900 transition-colors">Edit</Link>
                                        <button onClick={() => handleDelete(teacher.id)} className="text-red-600 hover:text-red-900 transition-colors">Delete</button>
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

export default TeacherIndex;