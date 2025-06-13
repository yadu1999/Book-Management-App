
import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Calendar, User, BookOpen, Tag } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-book/${book.id}`);
  };

  const getStatusColor = (status) => {
    return status === 'Available' ? 'bg-green-500' : 'bg-orange-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col glass hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
              {book.title}
            </CardTitle>
            <Badge
              className={`${getStatusColor(book.status)} text-white border-0 ml-2 flex-shrink-0`}
            >
              {book.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 space-y-3">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span className="font-medium">{book.author}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Tag className="h-4 w-4" />
            <span>{book.genre}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{book.publishedYear}</span>
          </div>

          {book.description && (
            <p className="text-sm text-muted-foreground line-clamp-3 mt-3">
              {book.description}
            </p>
          )}

          {book.pages && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>{book.pages} pages</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-3 border-t border-border/50">
          <div className="flex w-full space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="flex-1 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(book.id)}
              className="flex-1 hover:bg-red-50 hover:border-red-300 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BookCard;
