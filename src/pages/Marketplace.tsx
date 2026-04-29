import React, { useState, useEffect } from "react";
import { Search, Filter, MapPin, ShieldCheck, ArrowRight, ChevronLeft, ChevronRight, Activity } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Fix for Leaflet default icon issue
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

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

import { mockProjects } from "../data/projects";

export default function Marketplace() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "All" || project.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleBuy = (projectId: number) => {
    navigate(`/checkout?projectId=${projectId}`);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header Section */}
      <div className="bg-surface-dim border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-4xl font-display font-extrabold text-primary mb-2 tracking-tight">CarbonX Marketplace</h1>
              <p className="text-slate-500 font-medium">Verified high-integrity carbon offsets from the Indian subcontinent.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search projects or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium"
                />
              </div>
              <div className="relative sm:w-48">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium appearance-none cursor-pointer"
                >
                  <option value="All">All Types</option>
                  <option value="Forestry">Forestry</option>
                  <option value="Solar">Solar</option>
                  <option value="Soil">Soil Health</option>
                  <option value="Blue Carbon">Blue Carbon</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Global Project Map - Wrapped in a Card */}
        <div className="mb-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-extrabold text-primary mb-4 tracking-tight">Global Project Network</h2>
            <p className="text-slate-500 font-medium">Explore verified carbon sequestration projects across the Indian subcontinent.</p>
          </div>
          
          <div className="card-premium h-[600px] relative overflow-hidden border border-slate-200 shadow-2xl shadow-emerald-900/10 group">
            <MapContainer 
              center={[20.5937, 78.9629]} 
              zoom={5} 
              style={{ height: '100%', width: '100%' }} 
              scrollWheelZoom={false}
              className="z-0"
            >
              <MapResizer />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredProjects.map(project => (
                <Marker key={project.id} position={project.coords}>
                  <Popup className="premium-popup">
                    <div className="p-3 min-w-[220px] font-sans">
                      <div className="h-24 -mx-3 -mt-3 mb-3 overflow-hidden rounded-t-lg">
                        <img src={project.image} alt={project.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="font-black text-slate-900 mb-1 text-sm leading-tight">{project.name}</h4>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1 mb-3 font-bold uppercase tracking-wider">
                        <MapPin className="w-3 h-3 text-emerald-500" /> {project.location}
                      </p>
                      <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Price</span>
                          <span className="text-sm font-black text-emerald-600">${project.pricePerCredit}/t</span>
                        </div>
                        <button 
                          onClick={() => handleBuy(project.id)}
                          className="text-[9px] font-black uppercase tracking-widest bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-slate-900/20"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            
            {/* Map Overlay Elements */}
            <div className="absolute top-8 left-8 z-[1000] pointer-events-none">
              <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-slate-200/50 flex items-center gap-4 pointer-events-auto">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Live Network</p>
                  <p className="text-sm font-black text-slate-900">Institutional Project Map</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 right-8 z-[1000] flex flex-col gap-2">
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-slate-200/50 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{filteredProjects.length} Active Projects</span>
              </div>
            </div>

            {/* Decorative Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="card-premium flex flex-col group"
              >
                <div className="relative h-56 overflow-hidden rounded-t-lg">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-md text-white px-3 py-1.5 rounded-md text-[10px] font-black tracking-widest uppercase flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> {project.location}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-primary px-3 py-1.5 rounded-md text-[10px] font-black tracking-widest uppercase flex items-center gap-2 border border-white/20">
                    <ShieldCheck className="w-3 h-3 text-secondary" /> {project.verified}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-display font-extrabold text-primary mb-3 leading-tight group-hover:text-secondary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                      {project.farmer.charAt(0)}
                    </div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{project.farmer}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-surface-dim p-4 rounded-lg border border-slate-100">
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Available</p>
                      <p className="text-lg font-black text-primary tracking-tight">{project.available}</p>
                    </div>
                    <div className="bg-surface-dim p-4 rounded-lg border border-slate-100">
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Price</p>
                      <p className="text-lg font-black text-secondary tracking-tight">${project.pricePerCredit}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleBuy(project.id)}
                    className="btn-primary w-full group/btn"
                  >
                    Buy Credits
                    <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <div className="mt-24 flex items-center justify-center gap-4">
          <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map(page => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-bold transition-all ${
                  currentPage === page 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
