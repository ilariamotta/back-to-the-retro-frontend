export default function Faq() {
  return (
    <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 py-12 space-y-10 bg-gray-300 rounded-lg pt-7">
      <h1 className="text-3xl font-bold text-[#6C2BD9]">FAQ — Domande Frequenti</h1>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-zinc-800">Prodotti & Catalogo</h2>
        <div>
          <h3 className="font-semibold text-zinc-700">Che tipo di prodotti vendete?</h3>
          <p className="text-zinc-600">
            Offriamo videogiochi, console e accessori in stile retro, selezionati con cura per gli appassionati del gaming classico.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-zinc-700">Come funziona la ricerca dei prodotti?</h3>
          <p className="text-zinc-600">
            Puoi cercare per nome, piattaforma, categoria o brand. La ricerca viene salvata nell'URL così puoi condividere facilmente i risultati.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-zinc-700">I prodotti sono nuovi o usati?</h3>
          <p className="text-zinc-600">
            Dipende dal prodotto. Ogni scheda indica chiaramente lo stato dell'articolo.
          </p>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-zinc-800">Ordini & Checkout</h2>
        <div>
          <h3 className="font-semibold text-zinc-700">Come aggiungo un prodotto al carrello?</h3>
          <p className="text-zinc-600">
            Dalla scheda prodotto puoi selezionare la quantità e aggiungerlo al carrello con un click.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-zinc-700">Posso modificare quantità o rimuovere articoli?</h3>
          <p className="text-zinc-600">
            Certo. Puoi aumentare o diminuire la quantità direttamente dal carrello, che si aggiorna in tempo reale.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-zinc-700">Come funziona la copia dell'indirizzo?</h3>
          <p className="text-zinc-600">
            Durante il checkout puoi copiare automaticamente l'indirizzo di spedizione in quello di fatturazione.
          </p>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-zinc-800">Spedizioni</h2>
        <div>
          <h3 className="font-semibold text-zinc-700">In quali paesi spedite?</h3>
          <p className="text-zinc-600">
            Attualmente spediamo in Italia. Stiamo lavorando per espanderci in Europa.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-zinc-700">Quanto tempo impiega la spedizione?</h3>
          <p className="text-zinc-600">
            Generalmente 2–5 giorni lavorativi, a seconda della tua zona.
          </p>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-zinc-800">Pagamenti</h2>
        <div>
          <h3 className="font-semibold text-zinc-700">Quali metodi di pagamento accettate?</h3>
          <p className="text-zinc-600">
            Accettiamo i principali metodi di pagamento digitali. I dettagli completi sono disponibili nel checkout.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-zinc-700">Il pagamento è sicuro?</h3>
          <p className="text-zinc-600">
            Sì, utilizziamo protocolli di sicurezza aggiornati e partner affidabili.
          </p>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-zinc-800">Resi & Assistenza</h2>
        <div>
          <h3 className="font-semibold text-zinc-700">Posso restituire un prodotto?</h3>
          <p className="text-zinc-600">
            Puoi richiedere un reso entro i termini indicati nella nostra policy.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-zinc-700">Come posso contattare l'assistenza?</h3>
          <p className="text-zinc-600">
            Puoi scriverci tramite il form di contatto o via email.
          </p>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-zinc-800">Ricerca & Condivisione</h2>
        <div>
          <h3 className="font-semibold text-zinc-700">Perché l'URL cambia quando cerco?</h3>
          <p className="text-zinc-600">
            Perché la tua ricerca viene salvata nell'indirizzo, così puoi condividerla o salvarla nei preferiti.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-zinc-700">La ricerca è sensibile agli accenti?</h3>
          <p className="text-zinc-600">
            No: normalizziamo automaticamente il testo per rendere la ricerca più semplice.
          </p>
        </div>
      </section>
    </div>
  );
}
