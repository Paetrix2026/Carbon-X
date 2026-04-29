import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  FileDown, 
  LayoutDashboard,
  CheckCircle2,
  Trees
} from "lucide-react";

export default function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  // Format date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Mock data matching the image, but using state if available
  const orderDetails = {
    orderId: "CX-20231027-00150",
    date: formattedDate,
    buyer: state.buyerName || "Acme Industries",
    seller: state.projectName || "Green Valley Regenerative Farm",
    quantity: state.quantity ? `${state.quantity.toLocaleString()} Credits (tCO₂e)` : "150 Credits (tCO₂e)",
    pricePerTon: state.pricePerTon ? `$${state.pricePerTon.toFixed(2)}` : "$22.00",
    platformFee: state.platformFee ? `$${state.platformFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "$165.00",
    totalPaid: state.totalCost ? `$${state.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD` : "$3,465.00 USD",
    impact: {
      co2: state.quantity ? `${state.quantity.toLocaleString()}.00` : "150.00",
      trees: state.treesEquivalent ? state.treesEquivalent.toLocaleString() : "6,840",
      cars: state.carsOffRoad || "32.0"
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans pb-20 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      {/* Success Banner */}
      <div className="bg-emerald-600 text-white py-4 text-center shadow-lg relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
          <CheckCircle2 className="w-5 h-5" />
          <p className="font-black text-[10px] uppercase tracking-[0.2em]">Payment Successful. Your carbon credits are confirmed.</p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 mt-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-premium bg-white/80 backdrop-blur-sm border-none overflow-hidden shadow-2xl shadow-emerald-900/10 !rounded-[2.5rem]"
        >
          <div className="p-10 md:p-16">
            {/* Header Info */}
            <div className="mb-12">
              <h1 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Order ID: <span className="text-gradient-emerald">{orderDetails.orderId}</span></h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Date of Transaction</p>
                  <p className="text-sm font-black text-slate-700">{orderDetails.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">User Name (Buyer)</p>
                  <p className="text-sm font-black text-slate-700">{orderDetails.buyer}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Project Name (Seller)</p>
                  <p className="text-sm font-black text-slate-700">{orderDetails.seller}</p>
                </div>
              </div>
            </div>

            {/* Pricing Table */}
            <div className="bg-slate-50/50 rounded-[2rem] border border-slate-100 overflow-hidden mb-10 shadow-inner">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white/50 w-1/2">Quantity</td>
                    <td className="p-6 font-black text-slate-900 tracking-tight">{orderDetails.quantity}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white/50">Price per Ton</td>
                    <td className="p-6 font-black text-slate-900 tracking-tight">{orderDetails.pricePerTon}</td>
                  </tr>
                  <tr>
                    <td className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white/50">Platform Fee (5%)</td>
                    <td className="p-6 font-black text-slate-900 tracking-tight">{orderDetails.platformFee}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total Paid */}
            <div className="text-center py-10 border-y-2 border-emerald-500/20 mb-12 bg-emerald-50/30 rounded-3xl">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Paid</p>
              <h2 className="text-5xl font-black text-emerald-600 tracking-tighter">{orderDetails.totalPaid}</h2>
            </div>

            {/* Impact Section */}
            <div className="bg-slate-900 rounded-[2.5rem] p-12 text-white text-center mb-12 relative overflow-hidden shadow-2xl shadow-emerald-900/20">
              <div className="absolute top-0 right-0 p-10 opacity-10">
                <Trees className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-10">Your Environmental Impact</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                  <div className="space-y-2">
                    <div className="text-5xl font-black text-white tracking-tighter">{orderDetails.impact.co2}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tons of CO₂ Offset</div>
                  </div>
                  
                  <div className="space-y-2 md:border-x md:border-white/10">
                    <div className="text-5xl font-black text-white tracking-tighter">{orderDetails.impact.trees}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Trees Equivalent</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-5xl font-black text-white tracking-tighter">{orderDetails.impact.cars}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cars off road / year</div>
                  </div>
                </div>

                <div className="mt-12 pt-10 border-t border-white/10">
                  <p className="text-slate-400 text-sm italic font-medium leading-relaxed max-w-2xl mx-auto">
                    "By completing this purchase, you are directly supporting sustainable agriculture and contributing to a cooler planet."
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="flex-1 flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-900 px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-[0.96] shadow-xl shadow-slate-900/5 border border-slate-100">
                <FileDown className="w-5 h-5 text-emerald-500" />
                Download Digital Certificate
              </button>
              <button 
                onClick={() => navigate("/industry-dashboard")}
                className="flex-1 flex items-center justify-center gap-3 bg-slate-900 hover:bg-emerald-600 text-white px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-[0.96] shadow-xl shadow-slate-900/10"
              >
                <LayoutDashboard className="w-5 h-5" />
                Go to Dashboard
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
