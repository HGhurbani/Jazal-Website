import React from 'react';
import { motion } from 'framer-motion';

export const SaduPattern = ({ className }) => (
  <motion.div 
    className={`${className} sadu-pattern`}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1, delay: 0.2 }}
  />
);