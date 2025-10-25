import tips from "../../public/tips.json";

const icons = ["💧", "☀️", "🌡️", "✂️", "🪴", "🌿"];

export default function PlantCareTips() {
  return (
    <section className="py-20 px-6 bg-base-200">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-3">
          🌿 Essential Plant Care Tips
        </h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Master the art of plant care with our expert-curated tips and tricks
        </p>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-lg border border-primary/10 hover:border-primary/30 transition-all duration-300"
          >
            <div className="card-body">
              {/* Icon with hover animation */}
              <div className="text-5xl mb-4 transform transition-transform duration-300 hover:scale-110 hover:-rotate-6">
                {icons[index % icons.length]}
              </div>

              {/* Title & Description */}
              <h3 className="card-title text-xl text-primary mb-2">
                {tip.title}
              </h3>
              <p className="text-base-content/80 leading-relaxed">
                {tip.description}
              </p>

              {/* Decorative line */}
              <div className="h-1 bg-linear-to-r from-primary via-secondary to-accent rounded-full mt-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
