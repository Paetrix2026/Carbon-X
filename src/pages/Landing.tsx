import React from "react";
import { Link } from "react-router-dom";
import { Trees, Factory, ArrowRight, ShieldCheck, Globe, Zap, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const tickerData = [
  { pair: "VCS-INDIA", price: "$18.50", change: "+2.4%" },
  { pair: "GS-SOLAR", price: "$22.10", change: "+1.8%" },
  { pair: "BIO-CHAR", price: "$45.00", change: "-0.5%" },
  { pair: "MANGROVE", price: "$32.40", change: "+4.2%" },
  { pair: "AGRO-FOR", price: "$15.80", change: "+0.9%" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden pb-16">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000" 
            alt="Pristine Forest" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary/60 mix-blend-multiply" />
          {/* Hexagonal Overlay */}
          <div className="absolute inset-0 hex-pattern opacity-30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-8">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span>Institutional Grade Carbon Marketplace</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-8 leading-[1.1] tracking-tight max-w-4xl mx-auto">
              Bridging Industry and Earth for a <span className="text-secondary">Sustainable Future.</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 font-medium">
              CarbonX connects global industrial leaders with verified ecological projects to accelerate the transition to Net Zero.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/marketplace" className="btn-emerald w-full sm:w-auto !px-10 !py-4 text-lg">
                Explore Marketplace
              </Link>
              <Link to="/login?role=farmer&mode=register" className="btn-secondary w-full sm:w-auto !px-10 !py-4 text-lg !bg-white/10 !text-white !border-white/30 hover:!bg-white/20">
                Register as Farmer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pathways Section */}
      <section className="py-24 bg-surface-dim relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Industries */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="card-premium p-12 bg-white flex flex-col items-start text-left group"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <Factory className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-display font-extrabold text-primary mb-4">For Industries</h3>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Offset your operational footprint with high-integrity, verified carbon credits. Access real-time analytics and institutional compliance reporting.
              </p>
              <Link to="/login?role=industry" className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                Access Industry Portal <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* For Farmers */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="card-premium p-12 bg-white flex flex-col items-start text-left group"
            >
              <div className="w-16 h-16 bg-secondary/5 rounded-xl flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                <Trees className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-display font-extrabold text-primary mb-4">For Farmers</h3>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Monetize your sustainable land management. Use our satellite-verified tools to quantify sequestration and connect with global buyers.
              </p>
              <Link to="/login?role=farmer&mode=register" className="flex items-center gap-2 text-secondary font-bold group-hover:gap-4 transition-all">
                Register Your Land <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-extrabold text-primary mb-4">The CarbonX Standard</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Built on trust, transparency, and scientific rigor.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "Global Reach", desc: "Access projects from the Sundarbans to the Rajasthan Solar Parks." },
              { icon: Zap, title: "Real-time Verification", desc: "Satellite-monitored data ensures every credit represents real impact." },
              { icon: Leaf, title: "Eco-Tech Driven", desc: "Proprietary algorithms for precise sequestration calculations." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-xl border border-slate-100 hover:border-emerald-100 transition-colors">
                <feature.icon className="w-10 h-10 text-secondary mb-6" />
                <h4 className="text-xl font-bold text-primary mb-3">{feature.title}</h4>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Ticker */}
      <div className="fixed bottom-0 left-0 w-full bg-primary text-white py-3 z-50 border-t border-white/10">
        <div className="flex overflow-hidden whitespace-nowrap">
          <div className="flex animate-ticker gap-12 items-center px-12">
            {[...tickerData, ...tickerData].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">{item.pair}</span>
                <span className="font-bold">{item.price}</span>
                <span className={`text-xs font-bold ${item.change.startsWith('+') ? 'text-secondary' : 'text-red-400'}`}>
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
