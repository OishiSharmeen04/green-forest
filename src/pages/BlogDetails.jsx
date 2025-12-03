import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Spinner from "../components/LoadingSpinner";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    // Fetch all blogs
    fetch("/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        const currentBlog = data.find((b) => b.id === parseInt(id));
        setBlog(currentBlog);

        // Get related blogs (same category, excluding current)
        if (currentBlog) {
          const related = data
            .filter(
              (b) => b.category === currentBlog.category && b.id !== currentBlog.id
            )
            .slice(0, 3);
          setRelatedBlogs(related);
        }
      })
      .catch((err) => console.error("Error loading blog:", err));
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <title>{blog.title} - GreenNest Blog</title>

      {/* Breadcrumb */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </button>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            {blog.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg">
              {blog.author.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-gray-800">{blog.author}</div>
              <div className="text-sm text-gray-500">Author</div>
            </div>
          </div>

          <div className="h-8 w-px bg-gray-300"></div>

          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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

          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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

        {/* Featured Image */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed italic">
              {blog.excerpt}
            </p>
          </div>

          {/* Main Content - You can expand this with real content */}
          <div className="text-gray-700 leading-relaxed space-y-6">
            <p className="text-lg">
              {blog.excerpt} In this comprehensive guide, we'll explore everything you need to know about this topic, from the basics to advanced techniques that will help you succeed.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
              Getting Started
            </h2>
            <p>
              Whether you're a beginner or an experienced plant parent, understanding the fundamentals is crucial. Let's dive into the key aspects that will set you up for success.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
              Key Takeaways
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Understanding your plant's specific needs is essential</li>
              <li>Consistency in care routine leads to better results</li>
              <li>Observation and adjustment are key to success</li>
              <li>Don't be afraid to experiment and learn</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
              Expert Tips
            </h2>
            <p>
              Our experts recommend starting slow and gradually building your confidence. Remember, every plant parent makes mistakes – it's all part of the learning process!
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg my-8">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-bold text-yellow-800 mb-2">Pro Tip</h3>
                  <p className="text-yellow-900">
                    Keep a plant journal to track your care routine and observations. This will help you identify patterns and improve your plant care skills over time.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
              Conclusion
            </h2>
            <p>
              With these insights and tips, you're well-equipped to tackle this aspect of plant care. Remember, patience and consistency are your best friends on this green journey!
            </p>
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h3 className="text-lg font-bold text-gray-800">Share this article</h3>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog.id}
                  to={`/blog/${relatedBlog.id}`}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      {relatedBlog.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {relatedBlog.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{relatedBlog.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;