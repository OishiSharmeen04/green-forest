import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/LoadingSpinner";

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  if (!plants || plants.length === 0) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Get unique categories
  const categories = [...new Set(plants.map((plant) => plant.category))];

  // Filter and sort plants
  let filteredPlants = plants;

  if (filterCategory) {
    filteredPlants = filteredPlants.filter(
      (plant) => plant.category === filterCategory
    );
  }

  if (sortOrder === "asc") {
    filteredPlants = [...filteredPlants].sort((a, b) => {
      const nameA = a.name || a.plantName || "";
      const nameB = b.name || b.plantName || "";
      return nameA.localeCompare(nameB);
    });
  } else if (sortOrder === "desc") {
    filteredPlants = [...filteredPlants].sort((a, b) => {
      const nameA = a.name || a.plantName || "";
      const nameB = b.name || b.plantName || "";
      return nameB.localeCompare(nameA);
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <title>Plants</title>
      
      {/* Filter & Sort Controls - Top */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Category Filter */}
              <div className="form-control w-full sm:w-auto">
                <select
                  className="select select-bordered w-full sm:w-48"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Order */}
              <div className="form-control w-full sm:w-auto">
                <select
                  className="select select-bordered w-full sm:w-48"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="">Sort by Name</option>
                  <option value="asc">A to Z</option>
                  <option value="desc">Z to A</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-gray-600 font-medium">
              Showing {filteredPlants.length} plant{filteredPlants.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            🌿 Our Plants Collection
          </h1>
          <p className="text-gray-600">
            Discover our wide variety of eco-friendly plants
          </p>
        </div>

        {/* Plants Grid - 4 columns */}
        {filteredPlants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No plants found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredPlants.map((plant) => (
              <div
                key={plant.plantId}
                className="card bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate(`/plants/${plant.plantId}`)}
              >
                <figure className="relative overflow-hidden">
                  <img
                    src={plant.image}
                    alt={plant.name || plant.plantName}
                    className="h-48 w-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  {plant.rating && (
                    <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      ⭐ {plant.rating}
                    </div>
                  )}
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title text-lg font-bold text-gray-800 line-clamp-1">
                    {plant.name || plant.plantName}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">{plant.category}</p>
                  
                  {plant.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {plant.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    {plant.price && (
                      <span className="text-lg font-bold text-green-600">
                        ${plant.price}
                      </span>
                    )}
                    <button
                      className="btn btn-sm btn-primary gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/plants/${plant.plantId}`);
                      }}
                    >
                      See More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Plants;