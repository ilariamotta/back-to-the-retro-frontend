import Button from "../components/Button";

export default function ProductDetail() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* DETTAGLI PAGINA */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
        <span className="cursor-pointer hover:text-zinc-900">Ritorna al negozio</span>
        <span className="text-zinc-300">/</span>
        <span className="cursor-pointer hover:text-zinc-900">Videogames</span>
        <span className="text-zinc-300">/</span>
        <span className="font-medium text-zinc-900">
          Pokémon Crystal Version - Boxed
        </span>
      </div>

      {/* LAYOUT PAGINA */}
      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* IMMAGINI */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            {/* Immagine principale */}
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
              <img
                src="https://via.placeholder.com/1200x900.png?text=Main+Image"
                alt="products.cover_image HERE"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            {/* IMMAGINI SOTTO */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
                <img
                  src="https://via.placeholder.com/1200x900.png?text=Second+Image"
                  alt="images.name HERE"
                  className="aspect-[4/3] w-full object-cover" />
              </div>
              <div className="flex items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white text-sm text-zinc-500">
                Slot immagine
              </div>
            </div>
          </div>
        </div>

        {/* DETTAGLI PRODOTTO */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            {/* Titolo */}
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#2a2f45]">
              products.name
            </h1>

            {/* Prezzo */}
            <div className="mt-4 flex flex-wrap items-end gap-3">
              <p className="text-4xl font-extrabold text-[#6C2BD9]">€ products.price</p>
            </div>

            {/* Stock */}
            <div className="mt-4 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#00D084]" />
              <p className="text-sm font-semibold text-[#00D084]">
                products.stock_available in stock
              </p>
            </div>

            {/* Descrizione */}
            <p className="mt-4 text-sm leading-relaxed text-zinc-600">
              products.description
            </p>

            {/* Altre info */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm my-4">
              <div className="rounded-xl border bg-zinc-50 px-3 py-2">
                <p className="text-xs text-zinc-500">Piattaforma</p>
                <p className="font-semibold text-zinc-900">products.platform_id</p>
              </div>
              <div className="rounded-xl border bg-zinc-50 px-3 py-2">
                <p className="text-xs text-zinc-500">Brand</p>
                <p className="font-semibold text-zinc-900">products.brand</p>
              </div>
            </div>

            {/* BOTTONI */}
            {/* carrello */}
            <button type="button" className="w-full my-2 rounded-2xl bg-[#FFD21F] px-5 py-4 text-sm font-extrabold tracking-wide text-[#1a1400] shadow-sm transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_20px_rgba(255,210,31,0.45)] active:scale-[0.99]">
              Aggiungilo al carrello! 🛒
            </button>
            {/*acquista */}
            <button type="button" className=" w-full  my-2 rounded-2xl bg-[#00D084] px-5 py-4 text-sm font-extrabold tracking-wide text-[#06251c] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,208,132,0.45)] active:scale-[0.99] hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,208,132,0.45)] active:scale-[0.99]">
            ACQUISTALO ORA!
            </button>
{/* wishlist */}
            <button type="button" className="w-full my-2 rounded-2xl border-2 border-[#FF006E] bg-transparent px-5 py-4 text-sm tracking-wide text-[#FF006E] transition-all duration-300 hover:bg-[#FF006E]/10 hover:shadow-[0_0_20px_rgba(255,0,110,0.45)] hover:scale-[1.02] active:scale-[0.98]">
              Aggiungilo ai tuoi preferiti ♡
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}