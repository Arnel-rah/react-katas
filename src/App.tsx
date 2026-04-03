import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { ApiResponse, Character } from "./types/type";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { CharacterCard } from "./components/CharacterCard";

const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme);
  }, [theme]);

  useEffect(() => {
    fetch("https://dattebayo-api.onrender.com/characters?limit=20")
      .then(res => res.json())
      .then((data: ApiResponse) => setCharacters(data.characters ?? []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = characters.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={`min-h-screen transition-colors duration-500 font-mono p-6 ${theme ? "bg-[#0a0a0f] text-[#f0ede8]" : "bg-[#f7f6f3] text-[#1a1916]"}`}>
      <Header theme={theme} onToggleTheme={() => setTheme(!theme)} />
      <SearchBar theme={theme} value={search} onChange={setSearch} />

      {loading && <div className="flex flex-col items-center py-20 gap-3"><Loader2 className="animate-spin opacity-40" /></div>}
      {error && <div className="text-red-400 border border-red-500/20 p-4 rounded-xl bg-red-500/10">{error}</div>}

      {!loading && !error && (
        <>
          <p className="text-[11px] opacity-40 mb-4 tracking-wider">{filtered.length} ninjas trouvés</p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map(character => (
                <CharacterCard key={character.id} character={character} theme={theme} />
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
