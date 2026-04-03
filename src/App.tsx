import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Sun, Moon, Loader2, AlertCircle, User, Zap, Shield, Heart } from "lucide-react"
import type { ApiResponse, Character } from "./types/type"



const App = () => {
  const [theme, setTheme] = useState(false)
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  const toggleTheme = () => setTheme(prev => !prev)

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await fetch('https://dattebayo-api.onrender.com/characters?limit=20')
        if (!response.ok) throw new Error('Erreur réseau')
        const data: ApiResponse = await response.json()
        setCharacters(data.characters ?? [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
      } finally {
        setLoading(false)
      }
    }
    fetchCharacters()
  }, [])

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const filtered = characters.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={`min-h-screen transition-colors duration-500 font-mono p-6
      ${theme ? 'bg-[#0a0a0f] text-[#f0ede8]' : 'bg-[#f7f6f3] text-[#1a1916]'}`}>

      {/* Header */}
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
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-xl border flex items-center gap-2 text-xs transition-all
            ${theme
              ? 'bg-white/5 border-white/10 hover:bg-white/10'
              : 'bg-white border-[#e8e6e1] hover:border-orange-300'}`}
        >
          {theme ? <Sun size={14} className="text-orange-400" /> : <Moon size={14} className="text-indigo-400" />}
          {theme ? "Light" : "Dark"}
        </motion.button>
      </motion.header>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative mb-7 max-w-lg"
      >
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un personnage…"
          className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-sm outline-none backdrop-blur-md transition-all
            ${theme
              ? 'bg-white/5 border-white/10 focus:border-orange-500/50'
              : 'bg-white border-[#e8e6e1] focus:border-orange-400 shadow-sm'}`}
        />
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
            <Loader2 size={24} className="opacity-40" />
          </motion.div>
          <span className="text-sm opacity-40 animate-pulse">Chargement des ninjas…</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 max-w-lg"
        >
          <AlertCircle size={18} />
          <span className="text-sm">{error}</span>
        </motion.div>
      )}

      {/* Grid Results */}
      {!loading && !error && (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[11px] opacity-40 mb-4 tracking-wider"
          >
            {filtered.length} personnage{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
          </motion.p>

          <motion.div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((character) => (
                <motion.div
                  key={character.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -5 }}
                  className={`group rounded-2xl overflow-hidden border backdrop-blur-xl transition-all cursor-pointer
                    ${theme
                      ? 'bg-white/4 border-white/8 shadow-2xl shadow-black'
                      : 'bg-white border-[#e8e6e1] shadow-md shadow-gray-200'}`}
                >
                  {/* Image Container */}
                  <div className={`h-48 overflow-hidden relative ${theme ? 'bg-white/5' : 'bg-gray-100'}`}>
                    {character.images?.[0] ? (
                      <img
                        src={character.images[0]}
                        alt={character.name}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                        onError={e => (e.currentTarget.style.display = 'none')}
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <User size={40} className="opacity-10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60" />
                  </div>

                  {/* Character Info */}
                  <div className="p-4">
                    <h2 className="text-sm font-bold mb-2 tracking-tight">{character.name}</h2>

                    {character.personal?.affiliation && (
                      <div className="flex items-center gap-1.5 mb-3">
                        <Shield size={11} className="opacity-40" />
                        <span className="text-[10px] opacity-50 truncate">
                          {Array.isArray(character.personal.affiliation)
                            ? character.personal.affiliation[0]
                            : character.personal.affiliation}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5">
                      {character.nature_type?.slice(0, 3).map(type => (
                        <span key={type} className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-[#e8a838]">
                          {type}
                        </span>
                      ))}
                    </div>

                    {character.rank?.ninjaRank && (
                      <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/5">
                        <Heart size={10} className="text-red-400" />
                        <span className="text-[10px] opacity-40 italic">
                          {Object.values(character.rank.ninjaRank).slice(-1)[0]}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </div>
  )
}

export default App
