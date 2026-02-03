import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Links</h3>
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
        </div>
      </div>
    </footer>
  );
}
