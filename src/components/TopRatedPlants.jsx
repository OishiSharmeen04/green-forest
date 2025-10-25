import { useEffect, useState } from "react";

export default function TopRatedPlants() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => {
        const topPlants = data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3); // Top 3 rated plants
        setPlants(topPlants);
      });
  }, []);

  return (
    <section className="py-20 px-6 bg-linear-to-b from-base-100 to-base-200">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-3">
         🌟 Top Rated Plants
        </h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Discover our most loved plants, carefully selected for their beauty and ease of care
        </p>
      </div>

      {plants.length === 0 ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plants.map((plant) => (
            <div
              key={plant.plantId}
              className="card bg-base-100 shadow-xl overflow-hidden group transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <figure className="relative h-64 overflow-hidden">
                <img
                  src={plant.image}
                  alt={plant.plantName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 badge badge-primary badge-lg gap-2 shadow-lg">
                  ⭐ {plant.rating}
                </div>
              </figure>

              <div className="card-body">
                <h3 className="card-title text-2xl text-primary">
                  {plant.plantName}
                </h3>
                <p className="text-base-content/70 text-sm line-clamp-3">
                  {plant.description}
                </p>

                <div className="card-actions mt-4">
                  <a
                    href={`/plants/${plant.plantId}`}
                    className="btn btn-primary btn-block"
                  >
                    View Details →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
