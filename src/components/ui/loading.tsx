'use client';

import { motion, Variants } from 'motion/react';
import React from 'react';

function LoadingThreeDotsJumping() {
  const dotVariants: Variants = {
    jump: {
      y: -30,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      animate="jump"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      className="flex justify-center items-center min-h-screen gap-[10px]"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={index}
          className="size-[20px] bg-black rounded-full"
          style={{
            willChange: 'transform',
          }}
          variants={dotVariants}
        />
      ))}
    </motion.div>
  );
}

export default LoadingThreeDotsJumping;
