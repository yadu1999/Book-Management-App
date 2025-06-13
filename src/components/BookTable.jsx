import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const BookTable = ({ books, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (bookId) => {
    navigate(`/edit-book/${bookId}`);
  };

  const getStatusColor = (status) => {
    return status === 'Available' ? 'bg-green-500' : 'bg-orange-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass border-0 bg-white/80 dark:bg-gray-800/80">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Title</TableHead>
              <TableHead className="font-bold">Author</TableHead>
              <TableHead className="font-bold">Genre</TableHead>
              <TableHead className="font-bold text-center">Year</TableHead>
              <TableHead className="font-bold text-center">Status</TableHead>
              <TableHead className="font-bold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book, index) => (
              <motion.tr
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:bg-muted/50"
              >
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell className="text-muted-foreground">{book.author}</TableCell>
                <TableCell className="text-muted-foreground">{book.genre}</TableCell>
                <TableCell className="text-muted-foreground text-center">{book.publishedYear}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={`${getStatusColor(book.status)} text-white border-0`}
                  >
                    {book.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(book.id)}
                      className="hover:bg-blue-100 dark:hover:bg-blue-900/30"
                    >
                      <Edit className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(book.id)}
                      className="hover:bg-red-100 dark:hover:bg-red-900/30"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
};

export default BookTable;