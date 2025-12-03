import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Marquee from "react-fast-marquee";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function GreenExperts() {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    fetch("/experts.json")
      .then((res) => res.json())
      .then((data) => setExperts(data));
  }, []);

  const stats = [
    { value: "500+", label: "Happy Clients", icon: "😊" },
    { value: "1000+", label: "Plants Cared", icon: "🌱" },
    { value: "50+", label: "Workshops", icon: "📚" },
    { value: "15+", label: "Years Experience", icon: "⭐" },
  ];

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

      {/* Experts Slider */}
      <div className="max-w-7xl mx-auto mb-16">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="experts-swiper"
        >
          {experts.map((expert, index) => (
            <SwiperSlide key={index}>
              <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden h-full">
                {/* Circular Image */}
                <div className="flex justify-center mt-6">
                  <div className="relative">
                    <img
                      src={expert.img}
                      alt={expert.name}
                      className="w-32 h-32 object-cover rounded-full shadow-lg ring-4 ring-primary/20"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                      ✓
                    </div>
                  </div>
                </div>

                {/* Expertise badges */}
                <div className="flex flex-wrap justify-center gap-2 mt-4 px-4">
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
                  <p className="text-secondary font-medium text-sm md:text-base mb-2">
                    {expert.specialty}
                  </p>
                  <p className="text-base-content/70 text-sm md:text-base line-clamp-3">
                    {expert.bio}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Stats Marquee */}
      <div className="bg-linear-to-r from-green-600 to-emerald-600 py-8 rounded-2xl shadow-xl overflow-hidden">
        <Marquee
          gradient={false}
          speed={50}
          pauseOnHover={true}
          className="text-white"
        >
          {/* Duplicate stats for seamless loop */}
          {[...stats, ...stats].map((stat, i) => (
            <div
              key={i}
              className="mx-8 flex items-center gap-4 transition-all duration-300 hover:scale-105 px-8 py-4 rounded-xl"
            >
              <div className="text-4xl">{stat.icon}</div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-white/90">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .experts-swiper .swiper-button-next,
        .experts-swiper .swiper-button-prev {
          color: #22c55e;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .experts-swiper .swiper-button-next:after,
        .experts-swiper .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }

        .experts-swiper .swiper-pagination-bullet {
          background: #22c55e;
          opacity: 0.5;
        }

        .experts-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }

        .experts-swiper {
          padding-bottom: 50px;
        }
      `}</style>
    </section>
  );
}