import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { genres, languages } from '../lib/utils';

const BookForm = ({ book, onSubmit, loading, title }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: book || {
      title: '',
      author: '',
      genre: '',
      publishedYear: new Date().getFullYear(),
      status: 'Available',
      description: '',
      isbn: '',
      pages: '',
      language: 'English',
      publisher: '',
    },
  });

  React.useEffect(() => {
    register('genre', { required: 'Genre is required' });
  }, [register]);

  const watchedGenre = watch('genre');
  const watchedStatus = watch('status');

 

  const currentYear = new Date().getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="max-w-2xl mx-auto glass border-0 bg-white/80 dark:bg-gray-800/80">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  {...register('title', { required: 'Title is required' })}
                  className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  {...register('author', { required: 'Author is required' })}
                  className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                />
                {errors.author && (
                  <p className="text-sm text-red-500">{errors.author.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="genre">Genre *</Label>
                <Select
                  value={watchedGenre}
                  onValueChange={(value) => setValue('genre', value, { shouldValidate: true })}
                >
                  <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-purple-500">
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.genre && (
                  <p className="text-sm text-red-500">{errors.genre.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="publishedYear">Published Year *</Label>
                <Input
                  id="publishedYear"
                  type="number"
                  min="1000"
                  max={currentYear}
                  {...register('publishedYear', {
                    required: 'Published year is required',
                    min: { value: 1000, message: 'Year must be after 1000' },
                    max: { value: currentYear, message: `Year cannot be after ${currentYear}` },
                  })}
                  className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                />
                {errors.publishedYear && (
                  <p className="text-sm text-red-500">{errors?.publishedYear?.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={watchedStatus}
                  onValueChange={(value) => setValue('status', value)}
                >
                  <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-purple-500">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Issued">Issued</SelectItem>
                  </SelectContent>
                </Select>
                {errors?.status && (
                  <p className="text-sm text-red-500">{errors?.status?.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN</Label>
                <Input
                  id="isbn"
                  {...register('isbn')}
                  placeholder="978-0-123456-78-9"
                  className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pages">Pages</Label>
                <Input
                  id="pages"
                  type="number"
                  min="1"
                  {...register('pages', {
                    min: { value: 1, message: 'Pages must be at least 1' },
                  })}
                  className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                />
                {errors?.pages && (
                  <p className="text-sm text-red-500">{errors?.pages?.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={watch('language')}
                  onValueChange={(value) => setValue('language', value)}
                >
                  <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-purple-500">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages?.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="publisher">Publisher</Label>
                <Input
                  id="publisher"
                  {...register('publisher')}
                  className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  rows={4}
                  placeholder="Enter a brief description of the book..."
                  className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
                className="px-8"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Book'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BookForm;