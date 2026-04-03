import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Sun, Moon, Loader2, AlertCircle, User, Zap, Shield, Heart } from "lucide-react"

type NatureType = string

type Character = {
  id: number
  name: string
  images: string[]
  nature_type: NatureType[]
  personal?: {
    affiliation?: string | string[]
  }
  rank?: {
    ninjaRank?: Record<string, string>
  }
}

type ApiResponse = {
  characters: Character[]
}

const App = () => {
  const [theme, setTheme]           = useState(false)
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState<string | null>(null)
  const [search, setSearch]         = useState("")

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
    document.body.style.transition = "background-color 0.4s ease, color 0.4s ease"
    document.body.style.backgroundColor = theme ? "#0a0a0f" : "#f7f6f3"
    document.body.style.color = theme ? "#f0ede8" : "#1a1916"
    document.body.style.margin = "0"
  }, [theme])

  const filtered = characters.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ minHeight: '100vh', padding: '24px', fontFamily: "'DM Mono', monospace" }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#e8a838', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={18} color="#fff" />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>
              Naruto Wiki
            </h1>
            <p style={{ margin: 0, fontSize: 10, opacity: 0.4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Dattebayo API
            </p>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          onClick={toggleTheme}
          style={{ padding: '8px 16px', borderRadius: 10, border: `1px solid ${theme ? 'rgba(255,255,255,0.1)' : '#e8e6e1'}`, background: theme ? 'rgba(255,255,255,0.05)' : '#fff', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, fontSize: 12 }}
        >
          {theme ? <Sun size={14} /> : <Moon size={14} />}
          {theme ? "Light" : "Dark"}
        </motion.button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ position: 'relative', marginBottom: 28, maxWidth: 480 }}
      >
        <Search size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', opacity: 0.35, pointerEvents: 'none' }} />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un personnage…"
          style={{ width: '100%', padding: '11px 16px 11px 40px', borderRadius: 12, border: `1px solid ${theme ? 'rgba(255,255,255,0.1)' : '#e8e6e1'}`, background: theme ? 'rgba(255,255,255,0.05)' : '#fff', color: 'inherit', fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', backdropFilter: 'blur(8px)' }}
        />
      </motion.div>

      {/* Loading */}
      {loading && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: 10 }}>
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
            <Loader2 size={22} style={{ opacity: 0.4 }} />
          </motion.div>
          <span style={{ opacity: 0.4, fontSize: 13 }}>Chargement des ninjas…</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderRadius: 12, background: 'rgba(249,113,118,0.1)', border: '1px solid rgba(249,113,118,0.25)', color: '#f97176', maxWidth: 480 }}
        >
          <AlertCircle size={16} />
          <span style={{ fontSize: 13 }}>{error}</span>
        </motion.div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ fontSize: 11, opacity: 0.35, marginBottom: 16, letterSpacing: '0.08em' }}
          >
            {filtered.length} personnage{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
          </motion.p>

          <motion.div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
            <AnimatePresence>
              {filtered.map((character, i) => (
                <motion.div
                  key={character.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  style={{
                    borderRadius: 16, overflow: 'hidden',
                    border: `1px solid ${theme ? 'rgba(255,255,255,0.08)' : '#e8e6e1'}`,
                    background: theme ? 'rgba(255,255,255,0.04)' : '#fff',
                    backdropFilter: 'blur(12px)',
                    boxShadow: theme ? '0 4px 24px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                  }}
                >
                  {/* Image */}
                  <div style={{ height: 180, overflow: 'hidden', position: 'relative', background: theme ? 'rgba(255,255,255,0.03)' : '#f7f6f3' }}>
                    {character.images?.[0] ? (
                      <img
                        src={character.images[0]}
                        alt={character.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                        onError={e => (e.currentTarget.style.display = 'none')}
                      />
                    ) : (
                      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={40} style={{ opacity: 0.15 }} />
                      </div>
                    )}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
                  </div>

                  {/* Info */}
                  <div style={{ padding: '14px 16px' }}>
                    <h2 style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em' }}>
                      {character.name}
                    </h2>

                    {character.personal?.affiliation && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10 }}>
                        <Shield size={11} style={{ opacity: 0.4 }} />
                        <span style={{ fontSize: 10, opacity: 0.45, letterSpacing: '0.05em' }}>
                          {Array.isArray(character.personal.affiliation)
                            ? character.personal.affiliation[0]
                            : character.personal.affiliation}
                        </span>
                      </div>
                    )}

                    {character.nature_type?.length > 0 && (
                      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                        {character.nature_type.slice(0, 3).map(type => (
                          <span key={type} style={{
                            fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
                            padding: '3px 8px', borderRadius: 6,
                            background: theme ? 'rgba(232,168,56,0.12)' : 'rgba(232,168,56,0.08)',
                            border: '1px solid rgba(232,168,56,0.25)',
                            color: '#e8a838',
                          }}>
                            {type}
                          </span>
                        ))}
                      </div>
                    )}

                    {character.rank?.ninjaRank && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 10 }}>
                        <Heart size={10} style={{ color: '#f97176' }} />
                        <span style={{ fontSize: 10, opacity: 0.4 }}>
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
