import { NavLink } from "react-router-dom";

export default function HeroCategoryButtons({ to, label, imgIcon }) {


  return (
    <NavLink to={to} className="relative flex h-20 items-center rounded-2xl border border-white/10 bg-zinc-900/85 px-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-zinc-900 hover:scale-[1.01] active:scale-[0.99]">
      <img src={imgIcon} alt="" className="h-10 w-10 flex-shrink-0 object-contain" />
      <span className="absolute left-1/2 -translate-x-1/2 text-lg sm:text-xl font-bold tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">{label}</span>
    </NavLink>
  );
}