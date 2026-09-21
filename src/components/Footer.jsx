import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaGithub, 
  FaTwitter, 
  FaLinkedin, 
  FaDiscord, 
  FaPaperPlane, 
  FaCheckCircle,
  FaHeart
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="relative mt-20 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl text-slate-400 overflow-hidden">
      {/* Top subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <HiSparkles className="text-xl" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                InkPulse
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Exploring cutting-edge software architecture, human-centric UI/UX design, and insights into modern web engineering. Curated with care for developers and creators.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800 transition"
                aria-label="GitHub"
              >
                <FaGithub size={16} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800 transition"
                aria-label="Twitter"
              >
                <FaTwitter size={16} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={16} />
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800 transition"
                aria-label="Discord"
              >
                <FaDiscord size={16} />
              </a>
            </div>
          </div>

          {/* Column 1: Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">
                  Home Feed
                </Link>
              </li>
              <li>
                <a href="#recent-posts" className="hover:text-indigo-400 transition-colors">
                  Latest Stories
                </a>
              </li>
              <li>
                <a href="#featured" className="hover:text-indigo-400 transition-colors">
                  Featured Picks
                </a>
              </li>
              <li>
                <Link to="/register" className="hover:text-indigo-400 transition-colors">
                  Join Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="hover:text-indigo-400 transition-colors cursor-pointer">
                  Frontend Engineering
                </span>
              </li>
              <li>
                <span className="hover:text-indigo-400 transition-colors cursor-pointer">
                  Backend & Systems
                </span>
              </li>
              <li>
                <span className="hover:text-indigo-400 transition-colors cursor-pointer">
                  Artificial Intelligence
                </span>
              </li>
              <li>
                <span className="hover:text-indigo-400 transition-colors cursor-pointer">
                  UI/UX Architecture
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Weekly Digest
            </h4>
            <p className="text-xs text-slate-400">
              Get hand-picked articles, design breakdowns, and tech tutorials delivered directly to your inbox.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs">
                <FaCheckCircle className="text-emerald-400 shrink-0" />
                <span>You're in! Welcome to the loop.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg flex items-center justify-center transition shadow-md shadow-indigo-600/20"
                    aria-label="Subscribe"
                  >
                    <FaPaperPlane size={11} />
                  </button>
                </div>
                <span className="text-[11px] text-slate-500">
                  Zero spam. Unsubscribe at any time.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} InkPulse. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <FaHeart className="text-rose-500 text-[10px] animate-pulse" />
            <span>for passionate readers & builders</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
