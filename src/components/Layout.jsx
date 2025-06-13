
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;
