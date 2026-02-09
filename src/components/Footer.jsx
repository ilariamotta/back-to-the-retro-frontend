import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

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
            <img className="h-20 my-6" src="/images/logo-footer.png" alt="backtoretro" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#ffd21f] mb-4">Links</h3>
            <ul className="space-y-2">
              <li><Link to={'/'} className="hover:text-white transition">Home</Link></li>
              <li><Link to={'/categories/videogames'} className="hover:text-white transition">Videogames</Link></li>
              <li><Link to={'/categories/consoles'} className="hover:text-white transition">Consoles</Link></li>
              <li><Link to={'/categories/accessories'} className="hover:text-white transition">Accessories</Link></li>
              <li><Link to={'/faq'} className="hover:text-white transition">FAQ</Link></li>
              <li><Link to={'/privacy'} className="hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#ffd21f] mb-4">Contacts</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#ff006e] text-lg" />
                backToTheRetro4@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#ffd21f] text-lg" />
                Via Milano 42, Roma
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#07C3ED] text-lg" />
                02 123 4567
              </li>
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
