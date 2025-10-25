import { useEffect, useState } from "react";

export default function GreenExperts() {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    fetch("/experts.json")
      .then((res) => res.json())
      .then((data) => setExperts(data));
  }, []);

  return (
    <section className="py-16 px-6 bg-linear-to-b from-base-100 to-base-200">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-3">
          🌳 Meet Our Green Experts
        </h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Learn from passionate plant specialists dedicated to helping your garden flourish
        </p>
      </div>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {experts.map((expert, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            {/* Circular Image */}
            <div className="flex justify-center mt-4">
              <img
                src={expert.img}
                alt={expert.name}
                className="w-32 h-32 object-cover rounded-full shadow-lg"
              />
            </div>

            {/* Expertise badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-3 px-4">
              {expert.expertise.map((skill, i) => (
                <span
                  key={i}
                  className="badge badge-primary badge-sm shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Info */}
            <div className="card-body text-center py-4">
              <h3 className="text-xl md:text-2xl text-primary font-bold">
                {expert.name}
              </h3>
              <p className="text-secondary font-medium text-sm md:text-lg mb-1">
                {expert.specialty}
              </p>
              <p className="text-base-content/70 text-sm md:text-base">{expert.bio}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {[
          { value: "500+", label: "Happy Clients" },
          { value: "1000+", label: "Plants Cared" },
          { value: "50+", label: "Workshops" },
          { value: "15+", label: "Years Experience" }
        ].map((stat, i) => (
          <div
            key={i}
            className="text-center bg-base-100 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
              {stat.value}
            </div>
            <div className="text-sm md:text-base text-base-content/70">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
