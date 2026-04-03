import { motion } from "framer-motion";
import { Shield, User } from "lucide-react";
import type { Character } from "../types/type";

interface CharacterCardProps {
  character: Character;
  theme: boolean;
}

export const CharacterCard = ({ character, theme }: CharacterCardProps) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.2 }}
    whileHover={{ y: -5 }}
    className={`group rounded-2xl overflow-hidden border backdrop-blur-xl transition-all cursor-pointer
      ${theme ? "bg-white/4 border-white/8 shadow-2xl shadow-black" : "bg-white border-[#e8e6e1] shadow-md shadow-gray-200"}`}
  >
    <div className={`h-48 overflow-hidden relative ${theme ? "bg-white/5" : "bg-gray-100"}`}>
      {character.images?.[0] ? (
        <img
          src={character.images[0]}
          alt={character.name}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
        />
      ) : (
        <div className="h-full flex items-center justify-center">
          <User size={40} className="opacity-10" />
        </div>
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60" />
    </div>

    <div className="p-4">
      <h2 className="text-sm font-bold mb-2 tracking-tight">{character.name}</h2>

      {character.personal?.affiliation && (
        <div className="flex items-center gap-1.5 mb-3">
          <Shield size={11} className="opacity-40" />
          <span className="text-[10px] opacity-50 truncate">
            {Array.isArray(character.personal.affiliation) ? character.personal.affiliation[0] : character.personal.affiliation}
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {character.nature_type?.slice(0, 3).map((type) => (
          <span key={type} className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-[#e8a838]">
            {type}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);
