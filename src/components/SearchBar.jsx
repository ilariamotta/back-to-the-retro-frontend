import { FaSearch } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

export default function SearchGames({ query = "", setQuery }) {
  return (
    <section>
      <div className="w-full rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm transition focus-within:border-[#6C2BD9] focus-within:shadow-[0_0_20px_rgba(108,43,217,0.35)]">
        <div className="flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-3">
          <span className="text-zinc-400">
            <FaSearch />
          </span>

          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca quello che desideri..."
            className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 outline-none"
          />

          {query !== "" && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
              aria-label="Reset ricerca"
            >
              <IoIosClose />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
