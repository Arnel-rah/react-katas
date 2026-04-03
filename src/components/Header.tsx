
import { motion } from "framer-motion";
import { Zap, Sun, Moon } from "lucide-react";

interface HeaderProps {
  theme: boolean;
  onToggleTheme: () => void;
}

export const Header = ({ theme, onToggleTheme }: HeaderProps) => (
  <motion.header
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center justify-between mb-8"
  >
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-[#e8a838] flex items-center justify-center shadow-lg shadow-orange-500/20">
        <Zap size={18} className="text-white" />
      </div>
      <div>
        <h1 className="text-xl font-extrabold tracking-tight">Naruto Wiki</h1>
        <p className="text-[10px] opacity-40 tracking-[0.2em] uppercase">Dattebayo API</p>
      </div>
    </div>

    <motion.button
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      onClick={onToggleTheme}
      className={`px-4 py-2 rounded-xl border flex items-center gap-2 text-xs transition-all
        ${theme ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white border-[#e8e6e1] hover:border-orange-300"}`}
    >
      {theme ? <Sun size={14} className="text-orange-400" /> : <Moon size={14} className="text-indigo-400" />}
      {theme ? "Light" : "Dark"}
    </motion.button>
  </motion.header>
);
