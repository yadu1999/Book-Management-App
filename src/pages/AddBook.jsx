
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooks } from '@/contexts/BookContext';
import BookForm from '@/components/BookForm';

const AddBook = () => {
  const navigate = useNavigate();
  const { addBook, loading } = useBooks();

  const handleSubmit = async (data) => {
    try {
      await addBook(data);
      navigate('/');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-4"
      >
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Button>
      </motion.div>

      <BookForm
        onSubmit={handleSubmit}
        loading={loading}
        title="Add New Book"
      />
    </div>
  );
};

export default AddBook;
