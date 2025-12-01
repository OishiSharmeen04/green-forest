import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";

const PlantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const [plant, setPlant] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Remove the redirect logic - let anyone view this page
  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => {
        const selected = data.find((p) => p.plantId === parseInt(id));
        setPlant(selected);
      });
  }, [id]);

  if (!plant) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-gray-500">Loading plant details...</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!user) {
      toast.warning("🌿 Please login to book a consultation!", {
        position: "top-right",
        autoClose: 3000,
      });
      // Redirect to login with current page as return path
      navigate("/login", { state: { from: `/plants/${id}` } });
      return;
    }

    // If logged in, proceed with booking
    toast.success(`🌿 Consultation booked for ${formData.name}!`, {
      position: "top-right",
      autoClose: 3000,
    });
    setFormData({ name: "", email: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <title>{plant.plantName}</title>
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost mb-6 text-gray-600 hover:text-primary"
        >
          ← Back to Plants
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Plant Image */}
          <div className="relative">
            <img
              src={plant.image}
              alt={plant.name}
              className="rounded-2xl shadow-lg w-full h-[500px] object-cover"
            />
          </div>

          {/* Plant Info */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">{plant.name}</h1>
            <p className="text-gray-600">{plant.description}</p>

            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
              {plant.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <div className="bg-white shadow p-4 rounded-lg flex-1">
                <span className="text-gray-500 font-medium">Price</span>
                <p className="text-2xl text-green-600 font-semibold mt-1">
                  ${plant.price}
                </p>
              </div>
              <div className="bg-white shadow p-4 rounded-lg flex-1">
                <span className="text-gray-500 font-medium">Stock</span>
                <p className="text-2xl text-blue-600 font-semibold mt-1">
                  {plant.availableStock}
                </p>
              </div>
              <div className="bg-white shadow p-4 rounded-lg flex-1">
                <span className="text-gray-500 font-medium">Rating</span>
                <p className="text-2xl text-yellow-500 font-semibold mt-1">
                  ⭐ {plant.rating}
                </p>
              </div>
            </div>

            {/* Book Consultation */}
            <div className="bg-white shadow-lg rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Book Consultation
              </h2>
              
              {/* Show login message if not logged in */}
              {!user && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-yellow-800 text-sm">
                    🔒 Please login to book a consultation
                  </p>
                </div>
              )}

              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:border-green-500 focus:ring focus:ring-green-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:border-green-500 focus:ring focus:ring-green-200"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;