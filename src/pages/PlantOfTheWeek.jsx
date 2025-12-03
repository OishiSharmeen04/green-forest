import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/LoadingSpinner";
import Confetti from "react-confetti";
import Marquee from "react-fast-marquee";

const PlantOfTheWeek = () => {
  const [featuredPlant, setFeaturedPlant] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch("/plants.json");
        if (!response.ok) throw new Error("Failed to fetch plants");
        const plants = await response.json();

        const topPlant = plants.reduce((top, current) => {
          return current.rating > top.rating ? current : top;
        }, plants[0]);

        setFeaturedPlant(topPlant);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlants();
  }, []);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (featuredPlant) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [featuredPlant]);

  if (!featuredPlant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-lime-50">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={300}
          recycle={false}
        />
      )}

      <title>Plant of the Week</title>

      {/* Hero Marquee Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 py-6">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={true}
          className="relative z-10"
        >
          {[
            { icon: "🏆", title: "Top Rated Plant", description: "Chosen by plant lovers" },
            { icon: "⭐", title: "Featured This Week", description: "Our highest rating" },
            { icon: "🌿", title: "Expert's Choice", description: "Recommended by pros" },
            { icon: "💚", title: "Most Popular", description: "Community favorite" },
            { icon: "✨", title: "Special Pick", description: "Exclusive selection" },
            { icon: "🌱", title: "Plant of the Week", description: "Don't miss out!" },
          ].map((item, index) => (
            <div
              key={index}
              className="mx-4 flex items-center gap-4 transition-all duration-300 px-6 py-4 hover:scale-105"
            >
              <div className="text-4xl">{item.icon}</div>
              <div className="text-left">
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <p className="text-green-50 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </Marquee>

        {/* Decorative lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

        <style jsx>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 0.1;
              transform: scale(1);
            }
            50% {
              opacity: 0.2;
              transform: scale(1.1);
            }
          }

          .delay-1000 {
            animation-delay: 1s;
          }
        `}</style>
      </div>


      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-[400px] lg:h-auto">
              <img
                src={featuredPlant.image}
                alt={featuredPlant.plantName || featuredPlant.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6 bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                🏆 Top Rated
              </div>
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{featuredPlant.rating}</div>
                    <div className="text-xs text-gray-600">{featuredPlant.reviews || 0} reviews</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-4 w-fit">
                {featuredPlant.category || "Featured Plant"}
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                {featuredPlant.plantName || featuredPlant.name}
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {featuredPlant.description}
              </p>

              {featuredPlant.features && featuredPlant.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Why We Love It
                  </h3>
                  <ul className="space-y-2">
                    {featuredPlant.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-linear-to-br from-green-50 to-green-100 px-6 py-4 rounded-xl border-2 border-green-200">
                  <div className="text-sm text-gray-600 font-medium mb-1">Special Price</div>
                  <div className="text-3xl font-bold text-green-700">
                    ${featuredPlant.price}
                  </div>
                </div>

                {featuredPlant.availableStock && (
                  <div className="bg-linear-to-br from-blue-50 to-blue-100 px-6 py-4 rounded-xl border-2 border-blue-200">
                    <div className="text-sm text-gray-600 font-medium mb-1">In Stock</div>
                    <div className="text-3xl font-bold text-blue-700">
                      {featuredPlant.availableStock}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate(`/plants/${featuredPlant.plantId}`)}
                className="w-full bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>View Full Details</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantOfTheWeek;