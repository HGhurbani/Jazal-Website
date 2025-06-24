import React from 'react';
import { motion } from 'framer-motion';

export const PalmIcon = ({ className }) => (
  <motion.svg
    className={className}
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.5 }}
  >
    <path d="M50 100C50 100 52.5 52.5 52.5 35C52.5 17.5 40 5 40 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M50 100C50 100 47.5 52.5 47.5 35C47.5 17.5 60 5 60 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M52.5 45C52.5 45 75 42.5 85 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M47.5 45C47.5 45 25 42.5 15 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M52.5 60C52.5 60 75 65 90 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M47.5 60C47.5 60 25 65 10 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </motion.svg>
);