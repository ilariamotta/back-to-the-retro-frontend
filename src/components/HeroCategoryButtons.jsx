import { NavLink } from "react-router-dom";

export default function HeroCategoryButtons({ to, label }) {
  return (
    <NavLink
      to={to}
      className="flex h-20 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/85 px-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-zinc-900 hover:scale-[1.01] active:scale-[0.99]"
    >
      {label}
    </NavLink>
  );
}