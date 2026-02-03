import HeroCategoryButtons from "./HeroCategoryButtons";

export default function BentoHero() {
    return (
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* VIDEO*/}
            <div className="lg:col-span-8">
                <div className="h-full rounded-2xl border bg-white p-4 shadow-sm">
                    <div className="overflow-hidden rounded-2xl border bg-zinc-900">
                          <img src="/images/hero.gif"alt="Hero Back to the Retro" className="w-full rounded-2xl object-cover"/>
                    </div>
                </div>
            </div>

            {/* BOTTONI*/}
            <div className="lg:col-span-4">
                <div className="h-full rounded-2xl border bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-semibold">Categorie</h3>
                    <p className="mt-1 text-sm text-zinc-600">Vai dritta al punto.</p>

                    <div className="mt-4 grid gap-3">
                        <HeroCategoryButtons to="/categories/videogames" label="Videogiochi" />
                        <HeroCategoryButtons to="/categories/consoles" label="Console" />
                        <HeroCategoryButtons to="/categories/accessories" label="Accessori" />
                    </div>
                </div>
            </div>
        </section>
    );
}