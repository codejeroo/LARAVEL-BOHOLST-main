import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const TeacherEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [teacher, setTeacher] = useState({ name: '', email: '', subject: '' });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        fetch(`/teachers/${id}`, {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setTeacher(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching teacher:', error);
                setLoading(false);
            });
    }, [id]);    const handleSubmit = (e) => {
        e.preventDefault();
    fetch(`/teachers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(teacher)
        })
        .then(res => {
            if (res.ok) {
                window.location.href = '/teachers';
            } else {
                return res.json().then(data => setErrors(data.errors ? Object.values(data.errors).flat() : []));
            }
        })
        .catch(error => console.error('Error updating teacher:', error));
    };

    const handleChange = (e) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value });
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="w-full max-w-xl mx-auto p-8 md:p-12 bg-white rounded-2xl shadow-xl border border-gray-200">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-800">Edit Teacher</h1>
                    <Link to="/teachers" className="text-blue-600 hover:text-blue-800 font-medium transition duration-300 no-underline">Back to List</Link>
                </div>

                {errors.length > 0 && (
                    <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
                        <p className="font-bold">Please fix the following errors:</p>
                        <ul className="mt-1 list-disc list-inside">
                            {errors.map((error, index) => <li key={index}>{error}</li>)}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={teacher.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                placeholder="Enter full name"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={teacher.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                placeholder="Enter email"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                id="subject"
                                value={teacher.subject}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                placeholder="Enter subject"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                    >
                        Update Teacher
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TeacherEdit;