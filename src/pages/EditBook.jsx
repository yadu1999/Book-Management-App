
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooks } from '@/contexts/BookContext';
import BookForm from '@/components/BookForm';
import { toast } from '@/components/ui/use-toast';

const EditBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBookById, updateBook, loading } = useBooks();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const foundBook = getBookById(id);
    if (foundBook) {
      setBook(foundBook);
    } else {
      toast({
        title: 'Error',
        description: 'Book not found',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [id, getBookById, navigate]);

  const handleSubmit = async (data) => {
    try {
      await updateBook(id, data);
      navigate('/');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading book details...</p>
        </div>
      </div>
    );
  }

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
        book={book}
        onSubmit={handleSubmit}
        loading={loading}
        title="Edit Book"
      />
    </div>
  );
};

export default EditBook;
