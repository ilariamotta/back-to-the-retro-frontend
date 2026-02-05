export default function CartItemCard({item}) {
    // const item = {
    //     name: "Prodotto",
    //     price: 0,
    //     image: "/images/placeholder_img.png",
    //     qty: 1,
    // }

    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm py-5 my-3">
            <div className="flex items-center gap-4">
                {/* Immagine */}
                <div className="h-20 w-24 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>

                {/* Nome + prezzo */}
                <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-extrabold text-[#2a2f45]">{item.name}</p>
                    <p className="mt-1 text-lg font-extrabold text-[#6C2BD9]">€ {Number(item.price).toFixed(2)}</p>
                </div>
                {/* QUANTITA' */}<span className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-bold text-zinc-700">x{item.quantity}</span>

                {/* Bottone rimuovi */}
                <button
                    type="button" className="
            shrink-0
            rounded-2xl
            border-2 border-[#FF006E]
            bg-transparent
            px-4 py-3
            text-xs font-extrabold tracking-wide
            text-[#FF006E]
            transition-all duration-300
            hover:bg-[#FF006E]/10
            hover:shadow-[0_0_16px_rgba(255,0,110,0.35)]
            active:scale-[0.99]
          ">
                    Rimuovi
                </button>
            </div>
        </div>
    );
}