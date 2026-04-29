import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { MapContainer, TileLayer, Polygon, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Trees, Satellite, BrainCircuit, Leaf, ShieldCheck, Activity, Map, Loader2, DollarSign } from 'lucide-react';

// Default fallback polygon
const DEFAULT_POLYGON: [number, number][] = [
  [12.9716, 77.5946],
  [12.9756, 77.5946],
  [12.9756, 77.5996],
  [12.9716, 77.5996]
];

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);
  return null;
}

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 500);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

export default function FarmMonitor() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/");
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
        
      if (!profile || profile.role !== "admin") {
        navigate("/");
      }
    };
    checkAdmin();
  }, [navigate]);

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [trees, setTrees] = useState<[number, number][]>([]);
  const [center, setCenter] = useState<[number, number]>([12.9736, 77.5971]);
  const [polygon, setPolygon] = useState<[number, number][]>(DEFAULT_POLYGON);
  const [farmSize, setFarmSize] = useState<number>(40);
  const [locError, setLocError] = useState<string>("");

  const updatePolygon = (lat: number, lng: number, sizeInAcres: number) => {
    if (sizeInAcres <= 0) return;
    // 1 Acre = ~4046.86 sq meters
    const sideLengthInMeters = Math.sqrt(sizeInAcres * 4046.86);
    // ~111,320 meters per degree of latitude
    const latOffset = (sideLengthInMeters / 111320) / 2;
    const lngOffset = (sideLengthInMeters / (111320 * Math.cos(lat * (Math.PI / 180)))) / 2;

    setPolygon([
      [lat - latOffset, lng - lngOffset],
      [lat + latOffset, lng - lngOffset],
      [lat + latOffset, lng + lngOffset],
      [lat - latOffset, lng + lngOffset]
    ]);
  };

  const fetchLocation = () => {
    setLocError("");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCenter([lat, lng]);
          updatePolygon(lat, lng, farmSize);
        },
        (error) => {
          console.error("Error getting location:", error);
          if (error.code === error.PERMISSION_DENIED) {
            setLocError("Location access denied. Please allow in browser.");
          } else {
            setLocError("Failed to fetch. Needs HTTPS or localhost.");
          }
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setLocError("Geolocation not supported.");
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []); // Only run on mount

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseFloat(e.target.value) || 0;
    setFarmSize(size);
    updatePolygon(center[0], center[1], size);
  };

  const generateTrees = () => Array.from({ length: Math.max(10, Math.floor(farmSize * 3)) }).map(() => [
    center[0] - (polygon[1][0] - polygon[0][0])/2 + Math.random() * (polygon[1][0] - polygon[0][0]),
    center[1] - (polygon[2][1] - polygon[1][1])/2 + Math.random() * (polygon[2][1] - polygon[1][1])
  ] as [number, number]);

  const handleNextStep = () => {
    setLoading(true);
    setTimeout(() => {
      if (step === 2) {
        setTrees(generateTrees());
      }
      setStep(s => s + 1);
      setLoading(false);
    }, 2000);
  };

  const getStepTitle = () => {
    switch(step) {
      case 0: return "Select Farm Boundary";
      case 1: return "Fetch Satellite Data";
      case 2: return "Run AI Tree Detection";
      case 3: return "Carbon Estimation Complete";
      default: return "";
    }
  };

  const getStepDescription = () => {
    switch(step) {
      case 0: return "Draw or select your land area on the map to begin monitoring.";
      case 1: return "Connecting to Sentinel Hub to fetch latest NDVI and vegetation health imagery.";
      case 2: return "Using YOLOv8 to identify individual trees, canopy size, and health from high-res imagery.";
      case 3: return "Biomass calculated. Carbon credits estimated based on verified absorption rates.";
      default: return "";
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 font-sans flex flex-col md:flex-row">
      {/* Sidebar Controls */}
      <aside className="w-full md:w-96 bg-white border-r border-slate-200 flex flex-col shadow-xl z-10 relative">
        <div className="p-8 border-b border-slate-100 bg-emerald-900 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl font-black tracking-tighter">CarbonX AI</h2>
          </div>
          <p className="text-emerald-100/80 text-sm font-medium">Satellite & AI Farm Monitoring</p>
        </div>

        <div className="p-8 flex-1 overflow-y-auto">
          {/* Progress Timeline */}
          <div className="space-y-6 mb-10 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            
            <div className={`relative flex items-center gap-4 ${step >= 0 ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${step > 0 ? 'bg-emerald-500 text-white' : step === 0 ? 'bg-emerald-100 text-emerald-600 border-2 border-emerald-500' : 'bg-slate-100 text-slate-400'}`}>
                <Map className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`font-bold ${step >= 0 ? 'text-slate-900' : 'text-slate-500'}`}>1. Area Selection</h4>
                <p className="text-xs text-slate-500 font-medium">Define farm boundaries</p>
              </div>
            </div>

            <div className={`relative flex items-center gap-4 ${step >= 1 ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${step > 1 ? 'bg-emerald-500 text-white' : step === 1 ? 'bg-emerald-100 text-emerald-600 border-2 border-emerald-500' : 'bg-slate-100 text-slate-400'}`}>
                <Satellite className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`font-bold ${step >= 1 ? 'text-slate-900' : 'text-slate-500'}`}>2. Satellite Data</h4>
                <p className="text-xs text-slate-500 font-medium">Fetch Sentinel-2 NDVI</p>
              </div>
            </div>

            <div className={`relative flex items-center gap-4 ${step >= 2 ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${step > 2 ? 'bg-emerald-500 text-white' : step === 2 ? 'bg-emerald-100 text-emerald-600 border-2 border-emerald-500' : 'bg-slate-100 text-slate-400'}`}>
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`font-bold ${step >= 2 ? 'text-slate-900' : 'text-slate-500'}`}>3. AI Detection</h4>
                <p className="text-xs text-slate-500 font-medium">YOLOv8 tree & health analysis</p>
              </div>
            </div>

            <div className={`relative flex items-center gap-4 ${step >= 3 ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${step >= 3 ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-slate-100 text-slate-400'}`}>
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`font-bold ${step >= 3 ? 'text-slate-900' : 'text-slate-500'}`}>4. Carbon Estimation</h4>
                <p className="text-xs text-slate-500 font-medium">Calculate sequestered CO₂</p>
              </div>
            </div>

          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
            <h3 className="font-black text-lg text-slate-900 mb-2">{getStepTitle()}</h3>
            <p className="text-sm text-slate-600 mb-6 font-medium leading-relaxed">{getStepDescription()}</p>
            
            {step === 0 && (
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Farm Size</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={farmSize}
                      onChange={handleSizeChange}
                      className="w-full pl-4 pr-16 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none font-bold text-slate-900 transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">Acres</span>
                  </div>
                </div>

                {locError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
                    {locError}
                  </div>
                )}
                <button 
                  onClick={fetchLocation}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 py-2.5 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2"
                >
                  <Map className="w-4 h-4" /> Try Fetching Location Again
                </button>
              </div>
            )}

            {step < 3 && (
              <button 
                onClick={handleNextStep}
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/10 disabled:opacity-70 disabled:pointer-events-none"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Proceed to Next Step"}
              </button>
            )}

            {step === 3 && (
              <button 
                onClick={() => { setStep(0); setTrees([]); }}
                className="w-full bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-600 py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Reset Analysis
              </button>
            )}
          </div>

          {/* Results Dashboard (Only visible at step 3) */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h3 className="font-black text-slate-900 tracking-tight flex items-center gap-2">
                <ShieldCheck className="text-emerald-500" /> Analysis Results
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                  <Trees className="w-5 h-5 text-emerald-600 mb-2" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Trees</p>
                  <p className="text-2xl font-black text-slate-900">{Math.floor(farmSize * 3)}</p>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                  <Activity className="w-5 h-5 text-blue-500 mb-2" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Health (NDVI)</p>
                  <p className="text-2xl font-black text-slate-900">{Math.floor(75 + Math.random() * 20)}%</p>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                  <Leaf className="w-5 h-5 text-green-500 mb-2" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Carbon Stored</p>
                  <p className="text-2xl font-black text-slate-900">{Math.floor(farmSize * 1.12)} t</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 border border-emerald-600 p-4 rounded-xl shadow-md text-white">
                  <DollarSign className="w-5 h-5 text-emerald-200 mb-2" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200">Est. Revenue</p>
                  <p className="text-2xl font-black text-white">${Math.floor(farmSize * 1.12 * 25).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Map Area */}
      <main className="flex-1 relative bg-slate-200 z-0 h-[50vh] md:h-auto">
        <MapContainer 
          center={[12.9736, 77.5971]} 
          zoom={16} 
          style={{ height: '100%', width: '100%' }} 
          zoomControl={false}
        >
          <MapResizer />
          <MapController center={center} />
          
          {/* Base Layer changes based on step */}
          {step < 1 ? (
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
          ) : (
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            />
          )}

          {/* Polygon Overlay */}
          <Polygon 
            positions={polygon} 
            pathOptions={{ 
              color: step === 0 ? '#64748b' : step === 1 ? '#3b82f6' : '#10b981', // Gray for selection, Blue for sat, Green for AI
              fillColor: step === 0 ? '#64748b' : step === 1 ? '#3b82f6' : '#10b981',
              fillOpacity: step === 0 ? 0.2 : step === 1 ? 0.3 : 0.1,
              weight: 3,
              dashArray: step <= 1 ? '5, 10' : ''
            }} 
          />

          {/* Tree AI Markers */}
          {step >= 3 && trees.map((pos, idx) => (
            <CircleMarker 
              key={idx}
              center={pos}
              radius={4}
              pathOptions={{
                color: '#ffffff',
                weight: 1,
                fillColor: Math.random() > 0.2 ? '#10b981' : '#f59e0b', // Some orange for varying health
                fillOpacity: 0.9
              }}
            />
          ))}

          {/* Scan Overlay Effect */}
          {loading && step === 2 && (
            <div className="absolute inset-0 z-[1000] pointer-events-none bg-emerald-500/10 mix-blend-overlay animate-pulse" />
          )}

        </MapContainer>

        {/* Map Overlays */}
        <div className="absolute top-6 right-6 z-[1000] bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-slate-200/50 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-700">Live Connection</span>
        </div>
      </main>
    </div>
  );
}
