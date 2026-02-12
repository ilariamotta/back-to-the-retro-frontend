export default function AboutUs() {
    return (
        <>
<section className="py-20">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <div className="space-y-10 rounded-2xl bg-gray-300 p-7 sm:p-10 shadow-sm">
          <header className="space-y-3">
            <p className="text-sm font-extrabold tracking-widest text-[#6C2BD9]">
              BACK TO THE RETRO
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-[#6C2BD9]">
              Chi siamo
            </h1>
            <p className="text-zinc-700 font-semibold leading-relaxed">
              Un portale per tornare dove tutto è iniziato: pixel grossi, musiche in loop e
              pomeriggi che sembravano infiniti.
            </p>
          </header>

          {/* SEZIONI */}
          <div className="space-y-6">
            {/* STORIA */}
            <section className="rounded-2xl bg-white/60 border border-white/40 p-6 sm:p-7 space-y-3">
              <h2 className="text-2xl font-extrabold text-zinc-800">
                A voi la nostra storia
              </h2>
              <div className="space-y-3 text-zinc-700 font-semibold leading-relaxed">
                <p>
                  C’era un tempo in cui bastava soffiare in una cartuccia per far ripartire il mondo.
                </p>
                <p>
                  Un tempo fatto di pixel grossi, livelli da imparare a memoria e scoperte senza guide.
                </p>
                <p>
                  <span className="font-extrabold text-zinc-800">Back to the Retro</span> nasce proprio lì:
                  dal desiderio di non lasciare quei ricordi chiusi in uno scatolone.
                </p>
              </div>
            </section>

            {/* MISSIONE */}
            <section className="rounded-2xl bg-white/60 border border-white/40 p-6 sm:p-7 space-y-3">
              <h2 className="text-2xl font-extrabold text-zinc-800">
                La nostra missione
              </h2>
              <p className="text-zinc-700 font-semibold leading-relaxed">
                Riportare il retrogaming dove merita di stare: nelle mani di chi vuole rivivere emozioni
                autentiche e di chi vuole scoprirle per la prima volta. Crediamo che il valore di un gioco
                non stia nei poligoni, ma nelle sensazioni che riesce ancora a regalare!
              </p>
            </section>

            {/* PROMESSE */}
            <section className="rounded-2xl bg-white/60 border border-white/40 p-6 sm:p-7 space-y-4">
              <h2 className="text-2xl font-extrabold text-zinc-800">
                Le nostre promesse
              </h2>

              <ul className="grid gap-3 sm:grid-cols-2 text-zinc-700 font-semibold">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#6C2BD9]/15 text-[#6C2BD9] font-black">
                    ✓
                  </span>
                  Solo prodotti originali
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#6C2BD9]/15 text-[#6C2BD9] font-black">
                    ✓
                  </span>
                  Console testate e funzionanti
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#6C2BD9]/15 text-[#6C2BD9] font-black">
                    ✓
                  </span>
                  Passione prima del profitto
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#6C2BD9]/15 text-[#6C2BD9] font-black">
                    ✓
                  </span>
                  Rispetto per la storia del videogioco
                </li>
              </ul>

              <div className="pt-2">
                <p className="text-zinc-800 font-extrabold">
                  Non vendiamo oggetti.
                </p>
                <p className="text-zinc-700 font-semibold">
                  Vendiamo viaggi nel tempo.
                </p>
              </div>
            </section>

            {/* MOTTO / CHIUSURA */}
            <footer className="rounded-2xl border border-white/40 bg-[#6C2BD9]/10 p-6 sm:p-7">
              <p className="text-zinc-800 font-extrabold">
                Accendi. Inserisci. Ritorna.
              </p>
              <p className="text-zinc-700 font-semibold leading-relaxed">
                Benvenuto in <span className="font-extrabold">Back to the Retro</span>. Il passato ti stava aspettando!
              </p>
            </footer>
          </div>
        </div>
      </div>
    </section>
    </>
    )
}