import React, { useState } from 'react';
import { LayoutDashboard, Users, FolderKanban, ShoppingCart, CheckCircle, XCircle, Moon, Sun, ArrowRight, ShieldCheck } from 'lucide-react';
import { mockProjects } from '../data/projects';

// Mock Data
const mockFarmers = [
  { id: 1, name: "Singh Farms", location: "Punjab, India", status: "Pending", submissionDate: "2026-04-28", size: "50 Acres", type: "Agroforestry" },
  { id: 2, name: "Patel Energy", location: "Gujarat, India", status: "Pending", submissionDate: "2026-04-27", size: "120 Acres", type: "Solar Installation" },
  { id: 3, name: "Kerala Greens", location: "Kerala, India", status: "Pending", submissionDate: "2026-04-26", size: "15 Acres", type: "Organic Plantation" },
];

const mockCredits = [
  { id: 1, project: "Rajasthan Solar Park Initiative", credits: "50,000 CC", price: "$18.50/t", status: "Pending Review" },
  { id: 2, project: "Western Ghats Agroforestry", credits: "10,000 CC", price: "$28.40/t", status: "Pending Review" },
];

export default function AdminPanel() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [farmers, setFarmers] = useState(mockFarmers);
  const [credits, setCredits] = useState(mockCredits);

  const approveFarmer = (id: number) => {
    const farmer = farmers.find(f => f.id === id);
    if (farmer) {
      const newProject = {
        id: Date.now(),
        name: `${farmer.name} Project`,
        location: farmer.location,
        type: farmer.type,
        available: "5,000 CC",
        pricePerCredit: 25.00,
        description: `Verified ${farmer.type} project by ${farmer.name}.`,
        farmer: farmer.name,
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
        coords: [20.5937, 78.9629] as [number, number],
        verified: "Verified by Admin"
      };
      mockProjects.push(newProject);
      setFarmers(farmers.filter(f => f.id !== id));
      alert(`${farmer.name} approved! Their project is now listed in the Marketplace.`);
    }
  };

  const rejectFarmer = (id: number) => {
    setFarmers(farmers.filter(f => f.id !== id));
  };

  const approveCredit = (id: number) => {
    const credit = credits.find(c => c.id === id);
    if (credit) {
      const newProject = {
        id: Date.now(),
        name: credit.project,
        location: "India",
        type: "Renewable Energy",
        available: credit.credits,
        pricePerCredit: parseFloat(credit.price.replace(/[^0-9.]/g, '')),
        description: `Newly approved credits for ${credit.project}.`,
        farmer: "Verified Organization",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800",
        coords: [22.0, 79.0] as [number, number],
        verified: "Gold Standard"
      };
      mockProjects.push(newProject);
      setCredits(credits.filter(c => c.id !== id));
      alert(`Credits for ${credit.project} approved and listed in the Marketplace!`);
    }
  };

  const rejectCredit = (id: number) => {
    setCredits(credits.filter(c => c.id !== id));
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Overview of your marketplace ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Farmers</p>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">1,248</h3>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-emerald-500 mt-4 font-bold flex items-center gap-1">
            <ArrowRight className="w-4 h-4 -rotate-45" /> +12 this week
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Credits</p>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">4.2M</h3>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-emerald-500 mt-4 font-bold flex items-center gap-1">
            <ArrowRight className="w-4 h-4 -rotate-45" /> +150k this month
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Transactions</p>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">$8.5M</h3>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl">
              <ShoppingCart className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-emerald-500 mt-4 font-bold flex items-center gap-1">
            <ArrowRight className="w-4 h-4 -rotate-45" /> +$1.2M this month
          </p>
        </div>
      </div>
    </div>
  );

  const renderFarmerVerification = () => (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Farmer Verification</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Review and verify new farmer registrations.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="px-6 py-5">Farmer Name</th>
                <th className="px-6 py-5">Location</th>
                <th className="px-6 py-5">Farm Details</th>
                <th className="px-6 py-5">Submission Date</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {farmers.map((farmer) => (
                <tr key={farmer.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors">
                  <td className="px-6 py-5 font-bold text-slate-900 dark:text-white">{farmer.name}</td>
                  <td className="px-6 py-5 text-slate-500 dark:text-slate-400 font-medium">{farmer.location}</td>
                  <td className="px-6 py-5">
                    <span className="block text-slate-900 dark:text-white font-bold">{farmer.size}</span>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-1">{farmer.type}</span>
                  </td>
                  <td className="px-6 py-5 text-slate-500 dark:text-slate-400 font-medium">{farmer.submissionDate}</td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {farmer.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 flex items-center justify-end gap-2">
                    <button onClick={() => approveFarmer(farmer.id)} className="p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl transition-colors" title="Approve">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button onClick={() => rejectFarmer(farmer.id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors" title="Reject">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProjectManagement = () => (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Project Management</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Monitor carbon generation across all verified projects.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="px-6 py-5">Project Name</th>
                <th className="px-6 py-5">Farmer / Organization</th>
                <th className="px-6 py-5">Type</th>
                <th className="px-6 py-5">Carbon Generated</th>
                <th className="px-6 py-5">Standard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {mockProjects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors">
                  <td className="px-6 py-5 font-bold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={project.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      {project.name}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-500 dark:text-slate-400 font-medium">{project.farmer}</td>
                  <td className="px-6 py-5 text-slate-500 dark:text-slate-400 font-medium">{project.type}</td>
                  <td className="px-6 py-5 font-black text-emerald-600 dark:text-emerald-400">{project.available}</td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {project.verified}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMarketplaceControl = () => (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Marketplace Control</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Approve carbon credits before listing on the marketplace.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="px-6 py-5">Project Source</th>
                <th className="px-6 py-5">Credit Volume</th>
                <th className="px-6 py-5">Proposed Price</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {credits.map((credit) => (
                <tr key={credit.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors">
                  <td className="px-6 py-5 font-bold text-slate-900 dark:text-white">{credit.project}</td>
                  <td className="px-6 py-5 font-black text-emerald-600 dark:text-emerald-400">{credit.credits}</td>
                  <td className="px-6 py-5 text-slate-900 dark:text-white font-black">{credit.price}</td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {credit.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 flex items-center justify-end gap-3">
                    <button onClick={() => approveCredit(credit.id)} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors shadow-lg shadow-emerald-900/10">
                      Approve Listing
                    </button>
                    <button onClick={() => rejectCredit(credit.id)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-300 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-[calc(100vh-80px)] transition-colors duration-200 font-sans ${isDark ? 'dark' : ''}`}>
      <div className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-[calc(100vh-80px)] transition-colors duration-200 flex flex-col md:flex-row">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex-shrink-0 flex flex-col">
          <div className="p-8">
            <h2 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center gap-3">
              <ShieldCheck className="text-emerald-600 w-8 h-8" />
              Admin Portal
            </h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">System Management</p>
          </div>
          
          <nav className="px-4 pb-8 space-y-2 flex-grow">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${
                activeTab === 'dashboard' 
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </button>
            <button
              onClick={() => setActiveTab('verification')}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${
                activeTab === 'verification' 
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Users className="w-5 h-5" /> Farmer Verification
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${
                activeTab === 'projects' 
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <FolderKanban className="w-5 h-5" /> Project Management
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${
                activeTab === 'marketplace' 
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <ShoppingCart className="w-5 h-5" /> Marketplace Control
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'verification' && renderFarmerVerification()}
            {activeTab === 'projects' && renderProjectManagement()}
            {activeTab === 'marketplace' && renderMarketplaceControl()}
          </div>
        </main>

        <button 
          onClick={toggleDarkMode}
          className="fixed bottom-6 right-6 p-4 bg-white dark:bg-slate-800 rounded-full shadow-xl border border-slate-200 dark:border-slate-700 hover:scale-110 active:scale-95 transition-all z-50" 
        >
          {isDark ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-slate-700" />
          )}
        </button>
      </div>
    </div>
  );
}
