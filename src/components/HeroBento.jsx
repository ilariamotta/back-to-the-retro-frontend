import HeroCategoryButtons from "./HeroCategoryButtons";
import { FaGamepad } from "react-icons/fa";
import { GiGameConsole } from "react-icons/gi";
import { FaHeadphones } from "react-icons/fa";

export default function BentoHero({icon}) {
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
                    <h3 className="text-lg font-bold text-center text-[#ff006e]">Categorie</h3>
                    <p className="text text-zinc-600 font-semibold text-center">Inizia i tuoi acquisti!</p>

                    <div className="mt-4 grid gap-3">
                        <HeroCategoryButtons to="/categories/videogames" label="VIDEOGIOCHI"  icon={FaGamepad}/>
                        <HeroCategoryButtons to="/categories/consoles" label="CONSOLE" icon={GiGameConsole} />
                        <HeroCategoryButtons to="/categories/accessories" label="ACCESSORI" icon={FaHeadphones} />
                    </div>
                </div>
            </div>
        </section>
    );
}