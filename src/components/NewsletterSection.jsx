import { useState } from "react";
import { FaPaperPlane, FaCheck, FaBell } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 4000);
    }
  };

  return (
    <section className="relative my-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 md:p-16 border border-indigo-500/20 bg-gradient-to-br from-indigo-950/80 via-slate-900/90 to-purple-950/80 backdrop-blur-xl shadow-2xl shadow-indigo-950/50">
        
        {/* Background ambient accents */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <HiSparkles className="text-amber-400" />
            <span>Curated Insights Weekly</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Stay ahead of the curve. <br />
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Never miss a breakthrough story.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-light">
            Join over 48,000 developers, software engineers, and founders receiving our weekly deep-dives on web engineering and modern technology.
          </p>

          <div className="max-w-md mx-auto pt-2">
            {submitted ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center gap-3 text-emerald-300 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <FaCheck size={14} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold">Subscription confirmed!</p>
                  <p className="text-xs text-emerald-400/80">Check your inbox for our welcoming briefing.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work or personal email..."
                  required
                  className="flex-1 px-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition shadow-inner"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                >
                  <FaPaperPlane size={13} />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
            <p className="text-xs text-slate-400 mt-3 flex items-center justify-center gap-1.5">
              <FaBell size={10} className="text-indigo-400" />
              <span>No spam. Only high-value insights. One-click unsubscribe.</span>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default NewsletterSection;
