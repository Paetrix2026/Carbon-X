import { BookOpen, PlayCircle, Award, ArrowRight } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Understanding Carbon Sequestration",
    duration: "45 mins",
    type: "Video Course",
    icon: PlayCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Agroforestry Best Practices",
    duration: "1.5 hours",
    type: "Interactive Module",
    icon: BookOpen,
    color: "text-green-600",
    bgColor: "bg-green-100",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Maximizing Yields & Carbon Credits",
    duration: "2 hours",
    type: "Certification",
    icon: Award,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800",
  }
];

export default function Training() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 p-4 sm:p-6 lg:p-12 font-sans relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header Section - Asymmetrical Layout */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-display font-black text-slate-900 mb-4 tracking-tight">Knowledge <span className="text-gradient-emerald">Portfolio</span></h1>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">Enhance your institutional capacity for carbon sequestration. Access expert-led modules designed for high-integrity land management.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="bg-emerald-500 text-white flex items-center gap-2 px-6 py-2.5 rounded-full shadow-lg shadow-emerald-500/20 border border-emerald-400/20">
              <Award className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Certification Track Active</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {courses.map((course) => (
            <div key={course.id} className="card-premium overflow-hidden border-none bg-white/80 backdrop-blur-sm flex flex-col h-full group !rounded-[2.5rem]">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-emerald-900/20 group-hover:bg-emerald-900/10 transition-colors duration-500" />
                <div className="absolute top-6 left-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl border border-white/20">
                  <course.icon className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight tracking-tight group-hover:text-emerald-600 transition-colors">{course.title}</h3>
                <div className="flex items-center gap-4 text-[10px] text-slate-300 font-black uppercase tracking-widest mb-10 flex-grow">
                  <span className="text-slate-400">{course.type}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-200" />
                  <span className="text-slate-400">{course.duration}</span>
                </div>
                <button className="bg-slate-900 hover:bg-emerald-600 text-white w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-[0.96] shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 group">
                  Start Module <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section - Institutional Naturalist Style */}
        <div className="bg-slate-900 rounded-[2.5rem] p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-12 border-none relative overflow-hidden shadow-2xl shadow-emerald-900/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-4 tracking-tight">Institutional <span className="text-emerald-400">Consultation</span></h2>
            <p className="text-slate-400 max-w-2xl text-lg leading-relaxed font-medium">Connect with our professional agronomists to optimize your land's carbon potential through personalized strategic planning.</p>
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white relative z-10 whitespace-nowrap px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-[0.96] shadow-xl shadow-emerald-500/20">
            Book Strategic Session
          </button>
        </div>
      </div>
    </div>
  );
}
