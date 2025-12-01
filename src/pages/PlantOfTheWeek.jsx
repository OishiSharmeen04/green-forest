import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/LoadingSpinner";

const PlantOfTheWeek = () => {
  const [featuredPlant, setFeaturedPlant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch("/plants.json");
        if (!response.ok) throw new Error("Failed to fetch plants");
        const plants = await response.json();

        // Find plant with highest rating
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

  if (!featuredPlant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
      <title>Plant of the Week</title>
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold">Featured This Week</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Plant of the Week</h1>
          <p className="text-green-100 text-lg">Our highest-rated plant, chosen by plant lovers</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Section */}
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
                    <div className="text-xs text-gray-600">
                      {featuredPlant.reviews || 0} reviews
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Category Badge */}
              <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-4 w-fit">
                {featuredPlant.category || "Featured Plant"}
              </div>

              {/* Title */}
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                {featuredPlant.plantName || featuredPlant.name}
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {featuredPlant.description}
              </p>

              {/* Features */}
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

              {/* Price & Stats */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 px-6 py-4 rounded-xl border-2 border-green-200">
                  <div className="text-sm text-gray-600 font-medium mb-1">Special Price</div>
                  <div className="text-3xl font-bold text-green-700">
                    ${featuredPlant.price}
                  </div>
                </div>

                {featuredPlant.availableStock && (
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-4 rounded-xl border-2 border-blue-200">
                    <div className="text-sm text-gray-600 font-medium mb-1">In Stock</div>
                    <div className="text-3xl font-bold text-blue-700">
                      {featuredPlant.availableStock}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => navigate(`/plants/${featuredPlant.plantId}`)}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>View Full Details</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              {/* Additional Info */}
              <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>30-Day Guarantee</span>
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