
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { BookProvider } from '@/contexts/BookContext';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import AddBook from '@/pages/AddBook';
import EditBook from '@/pages/EditBook';

function App() {
  return (
    <ThemeProvider>
      <BookProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900 transition-all duration-500">
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add-book" element={<AddBook />} />
                <Route path="/edit-book/:id" element={<EditBook />} />
              </Routes>
            </Layout>
            <Toaster />
          </div>
        </Router>
      </BookProvider>
    </ThemeProvider>
  );
}

export default App;
