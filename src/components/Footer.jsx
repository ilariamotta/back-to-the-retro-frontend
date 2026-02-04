import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#211a1d] text-gray-300 py-10 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-[#ff006e] drop-shadow-[0_0_8px_rgba(255,0,110,0.75)]">Back To The Retro</h3>
            <p className="text-[#ffd21f] text-xs mb-4">Classic Games Revival</p>
            <p className="text-sm text-gray mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate pariatur, labore sequi similique amet quas cumque repellendus ex possimus!
            </p>
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
        <div className="border-t border-[#ff006e] my-8"></div>
        <div className="flex justify-center space-x-6 text-2xl">
          <Link to={'/'} className="hover:text-[#00BFFF] transition">
            <FaFacebookF />
          </Link>
          <Link to={'/'} className="hover:text-[#ff006e] transition">
            <FaInstagram />
          </Link>
          <Link to={'/'} className="hover:text-[#07C3ED] transition">
            <FaTwitter />
          </Link>
          <Link to={'/'} className="hover:text-[#df1515] transition">
            <FaYoutube />
          </Link>
        </div>
      </div>
    </footer>
  );
}
