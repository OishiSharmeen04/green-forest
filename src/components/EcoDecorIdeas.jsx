import { useEffect, useState } from "react";

export default function EcoDecorIdeas() {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    fetch("/ideas.json")
      .then((res) => res.json())
      .then((data) => setIdeas(data));
  }, []);

  return (
    <section className="bg-base-200 py-20 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-3">
          🌼 Eco Decor Ideas
        </h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Transform your home with sustainable and stylish plant decoration ideas
        </p>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {ideas.map((idea, i) => (
          <div
            key={i}
            className="card bg-base-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer rounded-xl"
          >
            {/* Image */}
            <figure className="relative h-52 overflow-hidden">
              <img
                src={idea.img}
                alt={idea.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </figure>

            {/* Card Body */}
            <div className="card-body p-4">
              <h3 className="card-title text-xl md:text-2xl text-primary mb-2">
                {idea.title}
              </h3>
              <p className="text-base-content/70 text-sm md:text-base">
                {idea.desc}
              </p>

              {/* Decorative progress bar */}
              <div className="h-1 bg-linear-to-r from-primary via-secondary to-accent rounded-full mt-3 gradient-flow" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
