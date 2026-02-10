import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimationBar from "../components/AnimationBar";

export default function AppLayout() {
    return (
        <>
            <Header />
            <AnimationBar />
            {/* contenitore sfondo */}
            <main className="bg-pattern min-h-screen">
        <Outlet />

            <Footer />
            </main>
        </>
    )
}