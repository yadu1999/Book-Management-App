import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const SearchAndFilter = ({
  searchTerm,
  onSearchChange,
  genreFilter,
  onGenreChange,
  statusFilter,
  onStatusChange,
  genres,
}) => {
  const clearFilters = () => {
    onSearchChange('');
    onGenreChange('');
    onStatusChange('');
  };

  const hasActiveFilters = searchTerm || genreFilter || statusFilter;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-4 glass border-0 bg-white/80 dark:bg-gray-800/80">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={genreFilter || '--all--'} onValueChange={onGenreChange}>
                <SelectTrigger className="w-full sm:w-[180px] transition-all duration-200 focus:ring-2 focus:ring-purple-500">
                  <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="--all--">All Genres</SelectItem>
                  {genres.filter(g => g).map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Select value={statusFilter || '--all--'} onValueChange={onStatusChange}>
              <SelectTrigger className="w-full sm:w-[180px] transition-all duration-200 focus:ring-2 focus:ring-purple-500">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="--all--">All Status</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Issued">Issued</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-300 dark:hover:bg-red-900/20"
              >
                <X className="h-4 w-4" />
                <span>Clear</span>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SearchAndFilter;