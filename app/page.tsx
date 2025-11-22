import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Fleet } from "./components/Fleet";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white antialiased">
      <Header />
      <main>
        <Hero />
        <Fleet />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
