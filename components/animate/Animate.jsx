import { motion, AnimatePresence } from "framer-motion";

// eslint-disable-next-line react/prop-types
export default function Animate({ showFaq, number, children }) {
  const faqVariants = {
    open: { y: 0, opacity: 1 },
    closed: { y: 100, opacity: 0 },
  };

  // const setFunc () => {

  // }

  const springAnimation = {
    type: "spring",
    damping: 15, // Adjust the damping as needed
    stiffness: 400, // Adjust the stiffness as needed
  };

  const cubicBezierEasing = [0.42, 0, 0.58, 1];

  return (
    showFaq == number && (
      <AnimatePresence>
        <motion.div
          layout
          initial="closed"
          exit={{ y: 1000, opacity: 0 }}
          animate={showFaq == number ? "open" : "closed"}
          variants={faqVariants}
          transition={{
            duration: 1,
            ease: cubicBezierEasing,
            type: "spring",
            ...springAnimation,
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    )
  );
}
