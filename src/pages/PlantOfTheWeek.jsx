import React, { useEffect, useState } from "react";

const PlantOfTheWeek = () => {
  const [featuredPlant, setFeaturedPlant] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch("/plants.json"); // JSON should be in public folder
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

  if (!featuredPlant) return <p>Loading...</p>;

  return (
    <section className="py-20 px-6 bg-linear-to-br from-green-50 via-emerald-50 to-lime-50">
      <title>Plant of the Week</title>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left - Details */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              {featuredPlant.plantName}
            </h2>
            <div className="mt-2 sm:mt-0 flex items-center gap-2 text-green-700 font-medium">
              <span>⭐ {featuredPlant.rating}</span>
              <span className="text-gray-500 text-sm">
                ({featuredPlant.reviews} reviews)
              </span>
            </div>
          </div>

          <p className="text-gray-600 mb-4 leading-relaxed">
            {featuredPlant.description}
          </p>

          <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
            {featuredPlant.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-bold text-green-700">
              ৳{featuredPlant.price}
            </span>
          </div>

        </div>

        {/* Right - Image */}
        <div className="flex justify-center">
          <img
            src={featuredPlant.image}
            alt={featuredPlant.name}
            className="rounded-3xl shadow-xl w-full max-w-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default PlantOfTheWeek;
