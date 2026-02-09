export default function AnimationBar() {
     const items = [
    "Spedizione gratuita sopra €100",
    "Promo retro: -10% su selezionati",
    "Console testate e garantite",
    "Ampia scelta di giochi e accessori",
    "Passione per il gaming vintage",
    "Solo prodotti originali",
  ];
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
          className="flexwhitespace-nowrap py-3 will-change-transform" style={{animation: "ticker 18s linear infinite",}}
        >
          {/* contenuto */}
          <div className="flex items-center gap-8 pr-8">
            {items.map((text, index) => (
              <span key={index} className="text-xs font-extrabold tracking-wide text-white">
                {text}
              </span>
            ))}
          </div>
          </div>
        </div>
      </div>
        </>
    )
}