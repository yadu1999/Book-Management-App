import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, BookOpen, LayoutGrid, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useBooks } from '@/contexts/BookContext';
import BookCard from '@/components/BookCard';
import BookTable from '@/components/BookTable';
import SearchAndFilter from '@/components/SearchAndFilter';
import Pagination from '@/components/Pagination';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import StatsCards from '@/components/StatsCards';

const Dashboard = () => {
  const {
    books,
    loading,
    currentPage,
    searchTerm,
    genreFilter,
    statusFilter,
    getPaginatedBooks,
    getTotalPages,
    getGenres,
    setCurrentPage,
    setSearchTerm,
    setGenreFilter,
    setStatusFilter,
    deleteBook,
  } = useBooks();

  console.log(books, "ojhnkbj")

  const [viewMode, setViewMode] = useState('grid');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const paginatedBooks = getPaginatedBooks();
  const totalPages = getTotalPages();
  const genres = getGenres();

  const handleDeleteClick = (bookId) => {
    const book = books.find(b => b.id === bookId);
    setBookToDelete(book);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (bookToDelete) {
      await deleteBook(bookToDelete.id);
      setDeleteDialogOpen(false);
      setBookToDelete(null);
    }
  };

  const handleGenreChange = (genre) => {
    setGenreFilter(genre === '--all--' ? '' : genre);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status === '--all--' ? '' : status);
  };

  return (
    <div className="space-y-8">
    
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Book Management Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your library collection with ease
          </p>
        </div>
        <Link to="/add-book">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <Plus className="mr-2 h-4 w-4" />
            Add New Book
          </Button>
        </Link>
      </motion.div>

      <StatsCards books={books} />

   
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex-grow w-full">
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            genreFilter={genreFilter}
            onGenreChange={handleGenreChange}
            statusFilter={statusFilter}
            onStatusChange={handleStatusChange}
            genres={genres}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('table')}
            className={viewMode === 'table' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

 
      {loading ? (
        <LoadingSkeleton viewMode={viewMode} />
      ) : paginatedBooks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-muted">
              <BookOpen className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">No books found</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm || genreFilter || statusFilter
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by adding your first book to the library'}
          </p>
          <Link to="/add-book">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Book
            </Button>
          </Link>
        </motion.div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {paginatedBooks?.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <BookCard book={book} onDelete={handleDeleteClick} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <BookTable books={paginatedBooks} onDelete={handleDeleteClick} />
          )}

       
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

 
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        bookTitle={bookToDelete?.title}
      />
    </div>
  );
};

export default Dashboard;