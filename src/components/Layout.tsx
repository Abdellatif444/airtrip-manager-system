
import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Système de Réservation de Vols</Link>
          
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="hover:underline">Accueil</Link>
            <Link to="/flights" className="hover:underline">Vols</Link>
            <Link to="/reservations" className="hover:underline">Réservations</Link>
            <Link to="/manage-reservations" className="hover:underline">Gérer les Réservations</Link>
            <Link to="/statistics" className="hover:underline">Statistiques</Link>
            <Link to="/profile" className="hover:underline">Profil</Link>
          </nav>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden container mx-auto px-4 pb-4">
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
              <Link to="/flights" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Vols</Link>
              <Link to="/reservations" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Réservations</Link>
              <Link to="/manage-reservations" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Gérer les Réservations</Link>
              <Link to="/statistics" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Statistiques</Link>
              <Link to="/profile" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Profil</Link>
            </nav>
          </div>
        )}
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      <footer className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© 2023 Système de Réservation de Vols. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
