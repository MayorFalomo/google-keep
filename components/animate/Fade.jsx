import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export default function Fade({ children, openModal }) {
  return (
    <AnimatePresence>
      {openModal && (
        <motion.div
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
