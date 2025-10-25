import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  const handleViewDetails = (plantId) => {
    if (user) {
      navigate(`/plants/${plantId}`);
    } else {
      toast.info("Please login to view details 🔒");
      navigate("/login");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <title>Plants</title>
      <h1 className="text-3xl font-bold text-center mb-8">🌿 Our Plants Collection</h1>

      {plants.length === 0 ? (
        <p className="text-center text-gray-500">Loading plants...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {plants.map((plant) => (
            <div
              key={plant.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
            >
              <figure>
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="h-60 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-xl font-semibold">{plant.name}</h2>
                <p className="text-gray-600">{plant.category}</p>

                <div className="card-actions justify-end mt-3">
                  <button
                    className="btn btn-sm btn-outline btn-success"
                    onClick={() => handleViewDetails(plant.plantId)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Plants;
