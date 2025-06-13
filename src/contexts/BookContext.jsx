
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { sampleBooks } from '../lib/utils';

const BookContext = createContext();

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

const initialState = {
  books: [],
  loading: false,
  error: null,
  currentPage: 1,
  booksPerPage: 10,
  searchTerm: '',
  genreFilter: '',
  statusFilter: '',
};

const bookReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_BOOKS':
      return { ...state, books: action.payload, loading: false };
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.payload] };
    case 'UPDATE_BOOK':
      return {
        ...state,
        books: state.books.map(book =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case 'DELETE_BOOK':
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload),
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload, currentPage: 1 };
    case 'SET_GENRE_FILTER':
      return { ...state, genreFilter: action.payload, currentPage: 1 };
    case 'SET_STATUS_FILTER':
      return { ...state, statusFilter: action.payload, currentPage: 1 };
    default:
      return state;
  }
};

export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  
  useEffect(() => {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
      dispatch({ type: 'SET_BOOKS', payload: JSON.parse(savedBooks) });
    } else {
   
     
      dispatch({ type: 'SET_BOOKS', payload: sampleBooks });
      localStorage.setItem('books', JSON.stringify(sampleBooks));
    }
  }, []);

 
  useEffect(() => {
    if (state.books.length > 0) {
      localStorage.setItem('books', JSON.stringify(state.books));
    }
  }, [state.books]);

  const addBook = async (bookData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
     
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newBook = {
        ...bookData,
        id: Date.now().toString(),
      };
      
      dispatch({ type: 'ADD_BOOK', payload: newBook });
      toast({
        title: 'Success!',
        description: 'Book added successfully.',
      });
      return newBook;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast({
        title: 'Error',
        description: 'Failed to add book.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateBook = async (id, bookData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
   
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedBook = { ...bookData, id };
      dispatch({ type: 'UPDATE_BOOK', payload: updatedBook });
      toast({
        title: 'Success!',
        description: 'Book updated successfully.',
      });
      return updatedBook;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast({
        title: 'Error',
        description: 'Failed to update book.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteBook = async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
     
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({ type: 'DELETE_BOOK', payload: id });
      toast({
        title: 'Success!',
        description: 'Book deleted successfully.',
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast({
        title: 'Error',
        description: 'Failed to delete book.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getBookById = (id) => {
    return state.books.find(book => book.id === id);
  };

  const getFilteredBooks = () => {
    let filtered = state.books;

    if (state.searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    if (state.genreFilter) {
      filtered = filtered.filter(book => book.genre === state.genreFilter);
    }

    if (state.statusFilter) {
      filtered = filtered.filter(book => book.status === state.statusFilter);
    }

    return filtered;
  };

  const getPaginatedBooks = () => {
    const filtered = getFilteredBooks();
    const startIndex = (state.currentPage - 1) * state.booksPerPage;
    const endIndex = startIndex + state.booksPerPage;
    return filtered.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    const filtered = getFilteredBooks();
    return Math.ceil(filtered.length / state.booksPerPage);
  };

  const getGenres = () => {
    const genres = [...new Set(state.books.map(book => book.genre))];
    return genres.sort();
  };

  const value = {
    ...state,
    addBook,
    updateBook,
    deleteBook,
    getBookById,
    getFilteredBooks,
    getPaginatedBooks,
    getTotalPages,
    getGenres,
    setCurrentPage: (page) => dispatch({ type: 'SET_CURRENT_PAGE', payload: page }),
    setSearchTerm: (term) => dispatch({ type: 'SET_SEARCH_TERM', payload: term }),
    setGenreFilter: (genre) => dispatch({ type: 'SET_GENRE_FILTER', payload: genre }),
    setStatusFilter: (status) => dispatch({ type: 'SET_STATUS_FILTER', payload: status }),
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};
