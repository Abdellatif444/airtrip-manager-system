
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Bienvenue sur notre Système de Réservation de Vols</h1>
        <p className="text-gray-700 mb-6">
          Trouvez et réservez facilement vos vols, gérez vos réservations et accédez à votre profil utilisateur.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link 
            to="/flights" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Rechercher des vols
          </Link>
          <Link 
            to="/reservations" 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Faire une réservation
          </Link>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3">Recherche de Vols</h2>
          <p className="text-gray-700 mb-4">Trouvez les meilleurs vols pour votre destination.</p>
          <Link 
            to="/flights" 
            className="text-blue-600 hover:underline block"
          >
            Explorer les vols →
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3">Gestion des Réservations</h2>
          <p className="text-gray-700 mb-4">Consultez et gérez vos réservations existantes.</p>
          <Link 
            to="/manage-reservations" 
            className="text-blue-600 hover:underline block"
          >
            Gérer les réservations →
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3">Statistiques</h2>
          <p className="text-gray-700 mb-4">Consultez les statistiques détaillées des vols et réservations.</p>
          <Link 
            to="/statistics" 
            className="text-blue-600 hover:underline block"
          >
            Voir les statistiques →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
