import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Spinner from "../components/LoadingSpinner";

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

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (plants.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % plants.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [plants]);


  if (!plants || plants.length === 0) {
    return (
      <div className="w-full h-[65vh] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const currentPlant = plants[currentIndex];

  return (
    <section className="relative w-full h-[65vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPlant.plantId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background image with gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/60 z-10"></div>
          <img
            src={currentPlant.image}
            alt={currentPlant.plantName}
            className="w-full h-full object-cover object-center"
          />

          {/* Content overlay - Left aligned */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center text-left text-white px-6 md:px-12 lg:px-20">
            <div className="max-w-2xl">

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight"
                style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
              >
                {currentPlant.title || currentPlant.plantName}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base md:text-l lg:text-l max-w-xl text-gray-100"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
              >
                {currentPlant.description || currentPlant.careLevel}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-start pt-4 w-full sm:w-auto"
              >
                <Link
                  to={`/plants/${currentPlant.plantId}`}
                  className="btn btn-primary btn-sm sm:btn-md lg:btn-lg gap-2 w-full sm:w-auto sm:min-w-40 lg:min-w-[180px] shadow-xl hover:scale-105 transition-transform"
                >
                  <span className="text-sm sm:text-base">View Details</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  to="/plants"
                  className="btn btn-outline btn-sm sm:btn-md lg:btn-lg gap-2 w-full sm:w-auto sm:min-w-40 lg:min-w-[180px] text-white border-white hover:bg-white hover:text-green-600 shadow-xl"
                >
                  <span className="text-sm sm:text-base">Browse All Plants</span>
                </Link>
              </motion.div>
            </div>
          </div>

          
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {plants.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex 
                ? "w-8 bg-white" 
                : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}