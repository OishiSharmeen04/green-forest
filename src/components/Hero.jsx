import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [plants, setPlants] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch plants.json
  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((err) => console.error(err));
  }, []);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (plants.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % plants.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [plants]);

  if (!plants || plants.length === 0) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        Loading slides...
      </div>
    );
  }

  const currentPlant = plants[currentIndex];

  return (
    <section className="relative w-full h-[85vh] overflow-hidden mb-5 shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPlant.plantId}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background image */}
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <img
            src={currentPlant.image}
            alt={currentPlant.plantName}
            className="w-full h-full object-cover"
          />

          {/* Text overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-6">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl"
            >
              {currentPlant.title || currentPlant.plantName}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl max-w-2xl drop-shadow-lg"
            >
              {currentPlant.description || currentPlant.careLevel}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
