export default function AnimationBar() {
     const items = [
    "Spedizione gratuita sopra €100",
    "Promo retro: -10% su selezionati",
    "Console testate e garantite",
    "Ampia scelta di giochi e accessori",
    "Passione per il gaming vintage",
    "Solo prodotti originali",
  ];

 function Separator() {
  return (
    <span className="mx-6 text-[#FFD21F] opacity-90">✦</span>
  );
}
    return (
        <>
        <div className="w-full border-t border-zinc-800 bg-black shadow-sm overflow-hidden">
            {/* FUNZIONAMENTO BARRA */}
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* STRUTTURA */}
      <div className="relative">
        {/* lati*/}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10" />

        {/* track che scorre */}
        <div
          className="flex w-full whitespace-nowrap py-3 will-change-transform" style={{animation: "ticker 25s linear infinite",}}
        >
           {/* contenuto */}
          <div className="flex items-center">
            {items.map((text) => (
              <span key={text} className="flex items-center">
                <span className="text-xs font-extrabold tracking-wide text-white/95">
                  {text}
                </span>
                <Separator />
              </span>
            ))}
          </div>

          {/* contenuto duplicato */}
          <div className="flex items-center" aria-hidden="true">
            {items.map((text) => (
              <span key={`${text}`} className="flex items-center">
                <span className="text-xs font-extrabold tracking-wide text-white/95">
                  {text}
                </span>
                <Separator />
              </span>
            ))}
          </div>
          </div>
        </div>
      </div>
        </>
    )
}