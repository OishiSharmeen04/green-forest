import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import Spinner from "../components/LoadingSpinner";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch blogs from JSON file
    fetch("/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setFilteredBlogs(data);
      })
      .catch((err) => console.error("Error loading blogs:", err));
  }, []);

  // Get unique categories
  const categories = ["All", ...new Set(blogs.map((blog) => blog.category))];

  // Filter blogs
  useEffect(() => {
    let filtered = blogs;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBlogs(filtered);
  }, [selectedCategory, searchQuery, blogs]);

  if (!blogs.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <title>Blog</title>

      {/* Hero Marquee Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 py-6">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={true}
          className="relative z-10"
        >
          {[
            { icon: "📚", title: "Plant Care Blog", description: "Expert tips & guides" },
            { icon: "🌿", title: "Care Tips", description: "Keep your plants healthy" },
            { icon: "🏡", title: "Decorative Ideas", description: "Style your space" },
            { icon: "✨", title: "New Articles", description: "Updated weekly" },
            { icon: "💡", title: "Expert Advice", description: "From professionals" },
            { icon: "🌱", title: "Growing Guide", description: "Step-by-step tutorials" },
          ].map((item, index) => (
            <div
              key={index}
              className="mx-4 flex items-center gap-4 transition-all duration-300 px-6 py-4 hover:scale-105"
            >
              <div className="text-4xl">{item.icon}</div>
              <div className="text-left">
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <p className="text-green-50 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </Marquee>

        {/* Decorative lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

        <style jsx>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 0.1;
              transform: scale(1);
            }
            50% {
              opacity: 0.2;
              transform: scale(1.1);
            }
          }

          .delay-1000 {
            animation-delay: 1s;
          }
        `}</style>
      </div>

      {/* Search & Filter Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-200 outline-none transition-all text-sm"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Category Filter & Results */}
            <div className="flex items-center gap-3 flex-wrap justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-sm rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
              <span className="text-gray-600 text-sm ml-2">
                {filteredBlogs.length} article{filteredBlogs.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer group"
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {blog.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Author & Read More */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
                        {blog.author.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {blog.author}
                      </span>
                    </div>
                    <button className="text-green-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      
    </div>
  );
};

export default Blog;