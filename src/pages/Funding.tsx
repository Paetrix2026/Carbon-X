import React, { useState, FormEvent } from "react";
import { DollarSign, Send, CheckCircle2, Loader2 } from "lucide-react";

export default function Funding() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 p-4 sm:p-6 lg:p-12 font-sans relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto space-y-12 relative z-10">
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-slate-100 shadow-xl shadow-emerald-900/5">
            <DollarSign className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-5xl font-display font-black text-slate-900 mb-4 tracking-tight">Capital <span className="text-gradient-emerald">Deployment</span></h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">Apply for institutional-grade initial capital and resources to remove entry barriers and accelerate your carbon sequestration infrastructure.</p>
        </div>

        {isSuccess ? (
          <div className="card-premium p-12 border-none bg-white/80 backdrop-blur-sm text-center animate-in fade-in zoom-in duration-500 !rounded-[2.5rem]">
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Application Registered</h2>
            <p className="text-slate-500 mb-10 leading-relaxed font-medium">Our institutional review committee will evaluate your funding request. Expect a formal response within 3-5 business days.</p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="bg-slate-900 hover:bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-[0.96] shadow-xl shadow-slate-900/10"
            >
              Submit New Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card-premium p-12 border-none bg-white/80 backdrop-blur-sm space-y-10 !rounded-[2.5rem]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3 ml-1 group-focus-within:text-emerald-500 transition-colors">Full Name</label>
                <input 
                  required 
                  type="text" 
                  className="w-full px-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold placeholder:text-slate-300 shadow-inner" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3 ml-1 group-focus-within:text-emerald-500 transition-colors">Farm Size (Acres)</label>
                <input 
                  required 
                  type="number" 
                  className="w-full px-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold placeholder:text-slate-300 shadow-inner" 
                  placeholder="e.g. 15" 
                />
              </div>
            </div>
            
            <div className="group">
              <label className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3 ml-1 group-focus-within:text-emerald-500 transition-colors">Requested Capital (USD)</label>
              <input 
                required 
                type="number" 
                className="w-full px-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold placeholder:text-slate-300 shadow-inner" 
                placeholder="e.g. 5000" 
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3 ml-1 group-focus-within:text-emerald-500 transition-colors">Strategic Purpose</label>
              <textarea 
                required 
                rows={4} 
                className="w-full px-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none resize-none transition-all font-bold placeholder:text-slate-300 shadow-inner" 
                placeholder="Detail your operational deployment plan (e.g., infrastructure procurement, irrigation systems)..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-slate-900 hover:bg-emerald-600 text-white w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-[0.96] shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
              ) : (
                <><Send className="w-5 h-5" /> Submit Application</>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
