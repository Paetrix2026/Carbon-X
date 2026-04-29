import React, { useState, FormEvent, useEffect } from "react";
import { Factory, Zap, Fuel, Activity, ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion } from "framer-motion";

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 500);

    const handleResize = () => {
      map.invalidateSize();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);
  return null;
}

// Fix for Leaflet default icon issue
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const portfolioLocations = [
  { id: 1, name: "Agroforestry Initiative", location: "Punjab, India", coords: [31.1471, 75.3412] as [number, number], credits: 150 },
  { id: 2, name: "Solar Farm Integration", location: "Gujarat, India", coords: [22.2587, 71.1924] as [number, number], credits: 175 },
];

const emissionData = [
  { month: 'Jan', emissions: 120, offset: 20 },
  { month: 'Feb', emissions: 130, offset: 30 },
  { month: 'Mar', emissions: 110, offset: 45 },
  { month: 'Apr', emissions: 140, offset: 50 },
  { month: 'May', emissions: 125, offset: 80 },
  { month: 'Jun', emissions: 115, offset: 100 },
];

export default function IndustryDashboard() {
  const navigate = useNavigate();
  const [electricity, setElectricity] = useState("");
  const [fuel, setFuel] = useState("");
  const [emissions, setEmissions] = useState<number | null>(null);

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();
    // Formula from PRD: emission = electricity * 0.82
    const calculated = parseFloat(electricity) * 0.82 + (parseFloat(fuel) || 0) * 2.3; // Added arbitrary fuel factor for demo
    setEmissions(calculated);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 p-4 sm:p-6 lg:p-12 font-sans relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Header Section with Asymmetrical Layout */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-16">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-emerald-500/20"
            >
              <Activity className="w-4 h-4" />
              <span>ESG Compliance Active</span>
            </motion.div>
            <h1 className="text-6xl font-display font-black text-slate-900 mb-6 tracking-tighter leading-none">Industry <span className="text-gradient-emerald">Analytics Portal</span></h1>
            <p className="text-xl text-slate-500 leading-relaxed font-medium max-w-2xl">Analyze your institutional carbon footprint and manage your ESG roadmap with verified, high-integrity offsets.</p>
          </div>
        </div>

        {/* Header Stats - Tonal Layering */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div 
            whileHover={{ y: -5, scale: 1.02 }}
            className="card-premium p-10 border-none shadow-emerald-900/5 bg-white/80 backdrop-blur-sm"
          >
            <div className="flex items-center gap-6">
              <div className="p-5 bg-emerald-500/10 rounded-[1.5rem] shadow-inner border border-emerald-500/10">
                <Factory className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Total Emissions (YTD)</p>
                <p className="text-4xl font-display font-black text-slate-900 tracking-tighter">740 <span className="text-lg font-bold text-slate-300">tCO₂</span></p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5, scale: 1.02 }}
            className="card-premium p-10 border-none shadow-emerald-900/5 bg-white/80 backdrop-blur-sm"
          >
            <div className="flex items-center gap-6">
              <div className="p-5 bg-teal-500/10 rounded-[1.5rem] shadow-inner border border-teal-500/10">
                <Activity className="w-8 h-8 text-teal-600" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Credits Purchased</p>
                <p className="text-4xl font-display font-black text-slate-900 tracking-tighter">325 <span className="text-lg font-bold text-slate-300">CC</span></p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="card-premium p-10 border-none bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-between group cursor-pointer"
            onClick={() => navigate("/marketplace")}
          >
            <div>
              <p className="text-[10px] text-emerald-100/60 font-black uppercase tracking-widest mb-2">Need more offsets?</p>
              <p className="text-xl font-black tracking-tight">Explore verified projects</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-white/20 transition-colors">
              <ArrowRight className="w-7 h-7 text-white" />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Input Form - Institutional Style */}
          <div className="lg:col-span-4 card-premium p-12 border-none shadow-emerald-900/5 bg-white/80 backdrop-blur-sm">
            <h2 className="text-3xl font-display font-black text-slate-900 mb-10 flex items-center gap-4 tracking-tighter">
              <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-100">
                <Zap className="w-6 h-6 text-emerald-500" />
              </div>
              Quantify <span className="text-emerald-600">Emissions</span>
            </h2>
            <form onSubmit={handleCalculate} className="space-y-8">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1 group-focus-within:text-emerald-600 transition-colors">Electricity (kWh)</label>
                <input
                  type="number"
                  required
                  value={electricity}
                  onChange={(e) => setElectricity(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold placeholder:text-slate-300 shadow-sm"
                  placeholder="e.g. 10000"
                />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1 flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                  <Fuel className="w-4 h-4 text-emerald-500" /> Fuel Consumption (Liters)
                </label>
                <input
                  type="number"
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold placeholder:text-slate-300 shadow-sm"
                  placeholder="e.g. 500"
                />
              </div>
              <button
                type="submit"
                className="btn-emerald w-full !py-4.5 !rounded-2xl shadow-xl shadow-emerald-900/10"
              >
                Process Emissions
              </button>
            </form>

            {emissions !== null && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 p-10 bg-emerald-500/5 rounded-[2rem] border border-emerald-500/10 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                  <Factory className="w-24 h-24 text-emerald-600" />
                </div>
                <p className="text-[10px] text-emerald-600/60 font-black uppercase tracking-widest mb-3">Calculated Footprint</p>
                <p className="text-6xl font-display font-black text-slate-900 mb-8 tracking-tighter">{emissions.toFixed(2)} <span className="text-xl font-sans font-bold text-slate-300 uppercase tracking-widest">tons</span></p>
                <Link to="/marketplace" className="btn-secondary w-full !py-4 !rounded-2xl border-emerald-200 hover:bg-emerald-50 group">
                  Find Offsets
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )}
          </div>

          {/* Charts - Editorial Layout */}
          <div className="lg:col-span-8 space-y-16">
            <div className="card-premium p-12 border-none shadow-emerald-900/5 bg-white/80 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                <h2 className="text-3xl font-display font-black text-slate-900 tracking-tighter">Emissions vs Offsets <span className="text-emerald-600">Progress</span></h2>
                <div className="flex gap-8">
                  <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400 shadow-sm" />
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Emissions</span>
                  </div>
                  <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                    <span className="text-[10px] text-emerald-700 font-black uppercase tracking-widest">Offsets</span>
                  </div>
                </div>
              </div>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={emissionData}>
                    <defs>
                      <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#64748b" stopOpacity={0.05}/>
                        <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorOffsets" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em'}} 
                      dy={20}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '24px', 
                        border: 'none', 
                        boxShadow: '0 20px 40px -10px rgba(0, 45, 36, 0.1)',
                        backgroundColor: '#ffffff',
                        padding: '20px'
                      }}
                      itemStyle={{ fontWeight: 800, fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="emissions" name="Emissions" stroke="#64748b" strokeOpacity={0.2} fill="url(#colorEmissions)" strokeWidth={2} />
                    <Area type="monotone" dataKey="offset" name="Offsets" stroke="#10b981" fill="url(#colorOffsets)" strokeWidth={4} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Global Offset Portfolio Map */}
            <div className="card-premium p-12 border-none shadow-emerald-900/5 bg-white/80 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                <h2 className="text-3xl font-display font-black text-slate-900 tracking-tighter">Global Offset <span className="text-emerald-600">Portfolio</span></h2>
                <div className="flex items-center gap-3 bg-emerald-50 px-5 py-2.5 rounded-full border border-emerald-100">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Institutional Provenance</span>
                </div>
              </div>
              <div className="h-[500px] rounded-[2.5rem] overflow-hidden border border-slate-200 relative z-10 shadow-2xl shadow-emerald-900/5 group">
                <MapContainer 
                  center={[20.5937, 78.9629]} 
                  zoom={4} 
                  style={{ height: '100%', width: '100%' }} 
                  scrollWheelZoom={false}
                  className="z-0"
                >
                  <MapResizer />
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {portfolioLocations.map(loc => (
                    <Marker key={loc.id} position={loc.coords}>
                      <Popup className="premium-popup">
                        <div className="p-3 min-w-[220px] font-sans">
                          <h4 className="font-black text-slate-900 text-base tracking-tight mb-1">{loc.name}</h4>
                          <p className="text-[10px] text-slate-500 font-bold mb-3 flex items-center gap-1 uppercase tracking-wider">
                            <MapPin className="w-3 h-3 text-emerald-500" /> {loc.location}
                          </p>
                          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                            <p className="text-[9px] text-emerald-600 font-black uppercase tracking-widest mb-1">Allocated Credits</p>
                            <p className="text-lg font-black text-emerald-700">{loc.credits} CC</p>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
                <div className="absolute inset-0 pointer-events-none border-[1px] border-slate-200/50 rounded-[2.5rem] z-[400]" />
                
                {/* Map Legend Overlay */}
                <div className="absolute top-6 right-6 z-[1000] pointer-events-none">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-slate-200/50 flex items-center gap-3 pointer-events-auto">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Active Portfolio</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Portfolio Cards */}
            <div className="space-y-10">
              <h2 className="text-3xl font-display font-black text-slate-900 tracking-tighter">Active Portfolio <span className="text-emerald-600">Details</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {portfolioLocations.map(project => (
                  <motion.div 
                    key={project.id} 
                    whileHover={{ y: -8, scale: 1.01 }}
                    className="card-premium overflow-hidden border-none shadow-emerald-900/5 group !rounded-[2rem] bg-white/80 backdrop-blur-sm"
                  >
                    <div className="h-56 overflow-hidden relative">
                      <img 
                        src={project.id === 1 
                          ? "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800"
                          : "https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?auto=format&fit=crop&q=80&w=800"
                        } 
                        alt={project.name} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md text-emerald-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl border border-white/20">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified
                      </div>
                    </div>
                    <div className="p-10">
                      <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-emerald-600 transition-colors">{project.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-bold mb-8">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" /> {project.location}
                      </div>
                      <div className="flex justify-between items-center pt-8 border-t border-slate-100">
                        <div>
                          <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest mb-1">Allocated Credits</p>
                          <p className="text-2xl font-black text-slate-900 tracking-tighter">{project.credits} <span className="text-sm font-bold text-slate-300">CC</span></p>
                        </div>
                        <Link to="/marketplace" className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all shadow-sm group/btn">
                          <ArrowRight className="w-6 h-6 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
