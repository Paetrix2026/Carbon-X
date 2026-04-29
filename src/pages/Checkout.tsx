import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  Leaf, 
  MapPin, 
  ChevronRight as ChevronRightIcon, 
  CreditCard as CreditCardIcon, 
  Building2, 
  Plus, 
  Trees, 
  Info as InfoIcon, 
  ShieldCheck, 
  Shield, 
  FileText, 
  HelpCircle,
  Minus,
  Lock,
  Calendar,
  User
} from "lucide-react";
import { mockProjects } from "../data/projects";

export default function Checkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = parseInt(searchParams.get("projectId") || "1");
  const project = mockProjects.find(p => p.id === projectId) || mockProjects[0];

  const [quantity, setQuantity] = useState(150);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");
  
  const pricePerTon = project.pricePerCredit;
  const platformFeeRate = 0.05;

  const subtotal = quantity * pricePerTon;
  const platformFee = subtotal * platformFeeRate;
  const totalCost = subtotal + platformFee;

  // Impact calculations (based on 150 tons = 6840 trees, 32 cars)
  const treesEquivalent = Math.round(quantity * 45.6);
  const carsOffRoad = (quantity * 0.2133).toFixed(1);

  const handleConfirm = () => {
    navigate("/confirmation", {
      state: {
        quantity,
        pricePerTon,
        platformFee,
        totalCost,
        treesEquivalent,
        carsOffRoad,
        projectName: project.name,
        buyerName: "Acme Industries"
      }
    });
  };

  const handleQuantityChange = (val: number) => {
    if (val < 1) return;
    setQuantity(val);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <button onClick={() => navigate("/marketplace")} className="hover:text-emerald-600">Marketplace</button>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="hover:text-emerald-600 cursor-pointer">{project.name}</span>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="text-slate-900 font-medium">Checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            {/* Project Summary */}
            <div className="card-premium overflow-hidden bg-white/80 backdrop-blur-sm border-none !rounded-[2rem]">
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="relative group">
                    <img 
                      alt={project.name} 
                      className="w-full md:w-40 h-48 md:h-40 object-cover rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-105" 
                      src={project.image}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{project.name}</h2>
                        <div className="flex items-center gap-2 text-slate-400 text-sm mt-2 font-bold">
                          <MapPin className="w-4 h-4 text-emerald-500" />
                          <span>{project.location}</span>
                        </div>
                      </div>
                      <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/20 border border-emerald-400/20 whitespace-nowrap">
                        Verified {project.verified}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm mt-4 leading-relaxed font-medium line-clamp-2">
                      {project.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-6">
                      <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                        Farmer: <span className="text-slate-700 ml-1">{project.farmer}</span>
                      </div>
                      <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                        Vintage: <span className="text-slate-700 ml-1">2023</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="card-premium bg-white/80 backdrop-blur-sm border-none p-8 !rounded-[2rem]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Quantity to Purchase</h3>
                <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 10)}
                    className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-slate-50 text-slate-600 transition-all active:scale-90 border border-slate-100"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-2 px-4">
                    <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)}
                      className="w-24 text-center bg-transparent font-black text-2xl text-slate-900 outline-none tracking-tighter"
                    />
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Credits</span>
                  </div>
                  <button 
                    onClick={() => handleQuantityChange(quantity + 10)}
                    className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-slate-50 text-slate-600 transition-all active:scale-90 border border-slate-100"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Payment Method</h3>
              <div className="space-y-4">
                <label 
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all hover:bg-emerald-50 group ${paymentMethod === "card" ? "border-emerald-500 bg-emerald-50/50" : "border-slate-100 bg-white/50"}`}
                >
                  <input checked={paymentMethod === "card"} readOnly className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 border-slate-300" name="payment" type="radio" />
                  <div className="ml-4 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border ${paymentMethod === "card" ? "bg-white border-emerald-100" : "bg-slate-50 border-slate-100"}`}>
                      <CreditCardIcon className={`w-5 h-5 ${paymentMethod === "card" ? "text-emerald-600" : "text-slate-400"}`} />
                    </div>
                    <span className="font-black text-slate-900 tracking-tight">Credit Card</span>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 opacity-50" />
                  </div>
                </label>

                <AnimatePresence>
                  {paymentMethod === "card" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-8 bg-slate-50/50 rounded-2xl border border-slate-200 mt-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cardholder Name</label>
                            <div className="relative group">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                              <input type="text" placeholder="John Doe" className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none font-bold placeholder:text-slate-300" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Card Number</label>
                            <div className="relative group">
                              <CreditCardIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                              <input type="text" placeholder="0000 0000 0000 0000" className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none font-bold placeholder:text-slate-300" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Expiry Date</label>
                            <div className="relative group">
                              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                              <input type="text" placeholder="MM / YY" className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none font-bold placeholder:text-slate-300" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CVV</label>
                            <div className="relative group">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                              <input type="text" placeholder="123" className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none font-bold placeholder:text-slate-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <label 
                  onClick={() => setPaymentMethod("bank")}
                  className={`flex items-center p-6 border rounded-2xl cursor-pointer hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group ${paymentMethod === "bank" ? "border-emerald-500 bg-emerald-50/50" : "border-slate-100 bg-white/50"}`}
                >
                  <input checked={paymentMethod === "bank"} readOnly className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 border-slate-300" name="payment" type="radio" />
                  <div className="ml-4 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border ${paymentMethod === "bank" ? "bg-white border-emerald-100" : "bg-slate-50 border-slate-100"}`}>
                      <Building2 className={`w-5 h-5 ${paymentMethod === "bank" ? "text-emerald-600" : "text-slate-400"}`} />
                    </div>
                    <span className="font-black text-slate-900 tracking-tight">Bank Transfer (ACH)</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Impact Card */}
            <div className="bg-slate-900 rounded-[2rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Trees className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-8 tracking-tight">Your Environmental <span className="text-emerald-400">Impact</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="space-y-1">
                    <div className="text-4xl font-black text-emerald-400 tracking-tighter">{quantity.toLocaleString()}.00</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tons of CO₂ Offset</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-4xl font-black text-emerald-400 tracking-tighter">{treesEquivalent.toLocaleString()}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trees Equivalent</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-4xl font-black text-emerald-400 tracking-tighter">{carsOffRoad}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cars off the road / year</div>
                  </div>
                </div>
                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="text-slate-400 text-sm italic font-medium leading-relaxed">
                    "By completing this purchase, you are directly supporting sustainable agriculture and contributing to a cooler planet."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Order Summary */}
          <div className="lg:col-span-4">
            <div className="card-premium bg-white/80 backdrop-blur-sm border-none p-8 sticky top-24 !rounded-[2rem]">
              <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight">Order Summary</h3>
              <div className="space-y-6 mb-8">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity</div>
                  <div className="font-black text-slate-900 tracking-tight">{quantity.toLocaleString()} <span className="text-xs text-slate-300">Credits</span></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Price per Ton</div>
                  <div className="font-black text-slate-900 tracking-tight">${pricePerTon.toFixed(2)}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subtotal</div>
                  <div className="font-black text-slate-900 tracking-tight">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest underline decoration-dotted cursor-help">
                    Platform Fee (5%)
                    <InfoIcon className="w-3 h-3 text-emerald-500" />
                  </div>
                  <div className="font-black text-slate-900 tracking-tight">${platformFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-200 mb-10">
                <div className="flex justify-between items-end">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Cost</div>
                  <div className="text-4xl font-black text-emerald-600 tracking-tighter">${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
                <div className="text-[10px] text-right text-slate-300 mt-2 font-black uppercase tracking-widest">USD</div>
              </div>
              <div className="space-y-4">
                <button 
                  onClick={handleConfirm}
                  className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 active:scale-[0.96] text-[10px] uppercase tracking-widest"
                >
                  <ShieldCheck className="w-5 h-5" />
                  Confirm and Offset
                </button>
                <p className="text-[10px] text-slate-400 text-center px-4 font-medium leading-relaxed">
                  By clicking 'Confirm and Offset', you agree to our <a className="underline text-emerald-600" href="#">Terms of Service</a> and <a className="underline text-emerald-600" href="#">Carbon Credit Agreement</a>.
                </p>
              </div>
              <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none">Secure<br/>Checkout</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-amber-500" />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none">Digital<br/>Certificate</span>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-slate-50 rounded-xl border border-slate-200 p-4 flex items-start gap-4">
              <HelpCircle className="w-5 h-5 text-slate-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Need help with your purchase?</h4>
                <p className="text-xs text-slate-500 mt-1">Our sustainability experts are available 24/7 to assist with large volume offsets.</p>
                <button className="text-xs font-bold text-emerald-600 mt-2 inline-block hover:underline">Contact Support</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
