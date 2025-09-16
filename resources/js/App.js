/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Example from './components/Example';
import StudentIndex from './components/StudentIndex';
import StudentCreate from './components/StudentCreate';
import StudentEdit from './components/StudentEdit';
import TeacherIndex from './components/TeacherIndex';
import TeacherCreate from './components/TeacherCreate';
import TeacherEdit from './components/TeacherEdit';
import '../sass/app.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Example />} />
      <Route path="/students" element={<StudentIndex />} />
      <Route path="/students/create" element={<StudentCreate />} />
      <Route path="/students/:id/edit" element={<StudentEdit />} />
      <Route path="/teachers" element={<TeacherIndex />} />
      <Route path="/teachers/create" element={<TeacherCreate />} />
      <Route path="/teachers/:id/edit" element={<TeacherEdit />} />
    </Routes>
  </Router>
);