import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Banner from './components/Banner';
import ScrollManager from './components/ScrollManager';
import { usePageProgress } from './hooks/useScrollProgress';
import Home from './pages/Home';
import Team from './pages/Team';
import Membership from './pages/Membership';
import Partners from './pages/Partners';
import Contact from './pages/Contact';

export default function App() {
  usePageProgress();
  return (
    <div className="app">
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <Banner />
    </div>
  );
}
