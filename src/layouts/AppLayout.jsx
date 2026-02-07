import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AppLayout() {
    return (
        <>
            <Header />
            {/* contenitore sfondo */}
            <main className="bg-pattern min-h-screen">
        <Outlet />

            <Footer />
            </main>
        </>
    )
}