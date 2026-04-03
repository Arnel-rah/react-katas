import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface SearchBarProps {
  theme: boolean;
  value: string;
  onChange: (val: string) => void;
}

export const SearchBar = ({ theme, value, onChange }: SearchBarProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="relative mb-7 max-w-lg"
  >
    <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Rechercher un personnage…"
      className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-sm outline-none backdrop-blur-md transition-all
        ${theme ? "bg-white/5 border-white/10 focus:border-orange-500/50" : "bg-white border-[#e8e6e1] focus:border-orange-400 shadow-sm"}`}
    />
  </motion.div>
);
