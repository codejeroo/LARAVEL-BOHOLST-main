import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Example from "./Example";
import Home from "./home";

export default function Router() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-200 flex gap-4">
        <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors">Home</Link>
        <Link to="/example" className="text-blue-600 hover:text-blue-800 transition-colors">Example</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/example" element={<Example />} />
      </Routes>
    </BrowserRouter>
  );
}
