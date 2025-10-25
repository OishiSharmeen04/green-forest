import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About Us", path: "/about" },
      { label: "Our Team", path: "/team" },
      { label: "Careers", path: "/careers" },
      { label: "Contact", path: "/contact" }
    ],
    resources: [
      { label: "Plant Care Guide", path: "/guide" },
      { label: "Blog", path: "/blog" },
      { label: "FAQ", path: "/faq" },
      { label: "Support", path: "/support" }
    ],
    legal: [
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms of Service", path: "/terms" },
      { label: "Cookie Policy", path: "/cookies" },
      { label: "Refund Policy", path: "/refund" }
    ]
  };

  const socialLinks = [
    { icon: <FaFacebookF />, label: "Facebook", url: "https://www.facebook.com" },
    { icon: <FaInstagram />, label: "Instagram", url: "https://www.instagram.com" },
    { icon: <FaTwitter />, label: "Twitter", url: "https://www.twitter.com" },
    { icon: <FaLinkedinIn />, label: "LinkedIn", url: "https://www.linkedin.com" }
  ];

  return (
    <footer className="bg-base-300 text-base-content">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="text-5xl">🌱</div>
              <div>
                <span className="text-3xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  GreenNest
                </span>
                <p className="text-sm text-base-content/60">Plant Paradise</p>
              </div>
            </Link>
            <p className="text-base-content/70 mb-4 leading-relaxed">
              Transform your space with beautiful plants and expert care. 
              We're passionate about bringing nature into your home.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm bg-primary/10 hover:bg-primary hover:text-primary-content border-none"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="link link-hover text-base-content/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="link link-hover text-base-content/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="link link-hover text-base-content/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-base-400 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-base-content/60 text-sm text-center md:text-left">
            © {currentYear} <span className="text-primary font-semibold">GreenNest</span>. 
            All rights reserved. Made with 💚 for plant lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}
