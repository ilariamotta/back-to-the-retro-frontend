import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col justify-end ">
          <h3 className="text-2xl font-bold text-[#ff006e]">Back To The Retro</h3>
          <p className="text-[#ffd21f] text-xs mb-4">Classic Games Revival</p>
          <p className="text-sm text-gray mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate pariatur, labore sequi similique amet quas cumque repellendus ex possimus! Nihil consectetur nostrum adipisci voluptates necessitatibus explicabo sapiente libero tempora perspiciatis.</p>
          <p className="text-xs text-gray">
            Copyright © 2026 Back To The Retro
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#ffd21f] mb-4">Links</h3>
          <ul className="space-y-2">
            <li><Link to={'/'} className="hover:text-white transition">Home</Link></li>
            <li><Link to={'/videogames'} className="hover:text-white transition">Videogames</Link></li>
            <li><Link to={'/consoles'} className="hover:text-white transition">Consoles</Link></li>
            <li><Link to={'/accessories'} className="hover:text-white transition">Accessories</Link></li>
            <li><Link to={'/FAQ'} className="hover:text-white transition">FAQ</Link></li>
            <li><Link to={'/privacy-returns'} className="hover:text-white transition">Privacy and Returns Policy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#ffd21f] mb-4">Contacts</h3>
          <ul className="space-y-2">
            <li>backtotheretro@gmail.com</li>
            <li>Via Milano 42, Roma</li>
            <li>02 123 4567</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
