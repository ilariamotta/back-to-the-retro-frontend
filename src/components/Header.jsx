import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";


// LINK PAGINE
const navLinks = [
    { title: "Home", path: "/" },
    // { title: "Prodotti", path: "/products" },
    {
        title: "Categorie",
        path: "/categories",
        // dropdown: [
        //     { title: "Videogiochi", path: "/categories/videogames" },
        //     { title: "Console", path: "/categories/consoles" },
        //     { title: "Accessori", path: "/categories/accessories" },
        // ],
    },
    {
        title: "Brand",
        path: "/brands",
        // dropdown: [
        //     { title: "Nintendo", path: "/brands/nintendo" },
        //     { title: "Sony", path: "/brands/sony" },
        //     { title: "Microsoft", path: "/brands/microsoft" },
        // ],
    },
    {
        title: "Piattaforma",
        path: "/platforms",
        // dropdown: [
        //     { title: "PC", path: "/platforms/pc" },
        //     { title: "PlayStation", path: "/platforms/playstation" },
        //     { title: "Xbox", path: "/platforms/xbox" },
        //     { title: "Nintendo", path: "/platforms/nintendo" },
        // ],
    },
];

// DESKTOP LINK
function DesktopNavLink({ to, children }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                [
                    "relative text-sm font-medium text-zinc-200 transition-colors duration-300 hover:text-white",
                    "hover:underline hover:decoration-wavy hover:underline-offset-4",
                    isActive ? "underline decoration-wavy underline-offset-4 text-white" : "",
                ].join(" ")
            }
        >
            {children}
        </NavLink>
    );
}

// DROPDOWN DESKTOP
function DesktopDropdown({ item }) {
    return (
        <div className="group relative">
            <DesktopNavLink to={item.path}>{item.title}</DesktopNavLink>

            <div
                className="invisible absolute left-0 top-full z-50 mt-3 w-56 translate-y-1 opacity-0 transition
                   group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
            >
                <div className="rounded-2xl border border-white/10 bg-zinc-950/95 p-2 shadow-lg backdrop-blur">
                    {item.dropdown.map((d) => (
                        <NavLink
                            key={d.path}
                            to={d.path}
                            className={({ isActive }) =>
                                [
                                    "block rounded-xl px-3 py-2 text-sm text-zinc-200 hover:bg-white/10 hover:text-white",
                                    isActive ? "bg-white/10 text-white" : "",
                                ].join(" ")
                            }
                        >
                            {d.title}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
}

// BOTTONE MOBILE
function MobileNavButton({ to, label, onClick }) {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                [
                    "w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-left text-sm font-semibold text-white",
                    "hover:bg-white/15 active:scale-[0.99] transition",
                    isActive ? "bg-white/15" : "",
                ].join(" ")
            }
        >
            {label}
        </NavLink>
    );
}

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                {/* HEADER ROW */}
                <div className="flex h-14 items-center">
                    {/* LEFT */}
                    <div className="flex items-center">
                        <NavLink
                            to="/"
                            className="">
                            <img className="h-8 sm:h-10 md:h-12 w-auto max-w-[120px] object-contain" src="/images/logo-piccolo.png" alt="backtoretro" />
                        </NavLink>
                    </div>

                    {/* CENTER */}
                    <nav className="hidden flex-1 items-center justify-center gap-6 sm:flex">
                        {navLinks.map((item) =>
                            item.dropdown ? (
                                <DesktopDropdown key={item.title} item={item} />
                            ) : (
                                <DesktopNavLink key={item.title} to={item.path}>
                                    {item.title}
                                </DesktopNavLink>
                            )
                        )}
                    </nav>

                    {/* RIGHT */}
                    <div className="flex items-center gap-2 ml-auto">
                        <NavLink
                            to="/search"
                            className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15"
                            title="Cerca"
                        >
                            <FaSearch size={16} />
                        </NavLink>
                        <NavLink
                            to="/wishlist"
                            className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15"
                            title="Wishlist"
                        >
                            <FaRegHeart size={16} />
                        </NavLink>

                        <NavLink
                            to="/carrello"
                            className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15"
                            title="Carrello"
                        >
                            <FiShoppingCart size={16} />
                        </NavLink>

                        <button
                            type="button"
                            className="ml-1 inline-flex rounded-xl bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15 sm:hidden"
                            onClick={() => setMobileOpen((v) => !v)}
                            aria-label="Apri menu"
                        >
                            <GiHamburgerMenu size={18} />
                        </button>
                    </div>
                </div>

                {/* MENU CELLULARE */}
                {mobileOpen && (
                    <div className="pb-4 sm:hidden">
                        <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                            <div className="grid gap-2">
                                {navLinks.map((item) => (
                                    <MobileNavButton
                                        key={item.title}
                                        to={item.path}
                                        label={item.title}
                                        onClick={() => setMobileOpen(false)}
                                    />
                                ))}
                                <div className="my-2 h-px bg-white/10" />
                                <MobileNavButton
                                    to="/search"
                                    label="Cerca"
                                    onClick={() => setMobileOpen(false)}
                                />
                                <MobileNavButton
                                    to="/wishlist"
                                    label="Wishlist"
                                    onClick={() => setMobileOpen(false)}
                                />
                                <MobileNavButton
                                    to="/carrello"
                                    label="Carrello"
                                    onClick={() => setMobileOpen(false)}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}