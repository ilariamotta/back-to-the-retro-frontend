import { NavLink } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-extrabold text-[#ff006e] drop-shadow-lg">
        404
      </h1>
      <p className="mt-4 text-xl text-zinc-300">
        Oops! La pagina che stai cercando non esiste.
      </p>
      <NavLink
        to="/"
        className="mt-8 inline-block px-6 py-3 rounded-lg bg-[#ff006e] text-white font-semibold shadow-md hover:bg-[#5a23b8] transition">
        Torna alla Home
      </NavLink>
    </div>
  );
}
