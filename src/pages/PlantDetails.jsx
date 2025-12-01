import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/LoadingSpinner";

const PlantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const [plant, setPlant] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

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
        <Spinner />
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.warning("🌿 Please login to book a consultation!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login", { state: { from: `/plants/${id}` } });
      return;
    }

    toast.success(`🌿 Consultation booked for ${formData.name}!`, {
      position: "top-right",
      autoClose: 3000,
    });
    setFormData({ name: "", email: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <title>{plant.plantName || plant.name}</title>
      
      {/* Breadcrumb & Back Button */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Plants
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Image Section */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
              <img
                src={plant.image}
                alt={plant.name || plant.plantName}
                className="w-full h-[400px] lg:h-[550px] object-cover"
              />
              {plant.rating && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {plant.rating}
                </div>
              )}
            </div>
          </div>

          {/* Right - Details Section */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                {plant.category || "Plant"}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
                {plant.name || plant.plantName}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {plant.description}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <div className="text-green-600 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600 font-medium">Price</p>
                <p className="text-xl font-bold text-green-700">${plant.price}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="text-blue-600 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600 font-medium">Stock</p>
                <p className="text-xl font-bold text-blue-700">{plant.availableStock}</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200">
                <div className="text-yellow-600 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600 font-medium">Rating</p>
                <p className="text-xl font-bold text-yellow-700">{plant.rating}</p>
              </div>
            </div>

            {/* Features */}
            {plant.features && plant.features.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {plant.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-600 mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Booking Form */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book a Consultation
              </h2>
              <p className="text-gray-600 text-sm mb-4">Get expert advice on plant care</p>
              
              {!user && (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4 rounded">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-amber-800 text-sm font-medium">
                      Please login to book a consultation
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Book Consultation Now
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