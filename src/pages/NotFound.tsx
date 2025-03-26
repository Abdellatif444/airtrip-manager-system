
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Page non trouvée</h2>
      <p className="text-gray-600 mb-8">La page que vous recherchez n'existe pas ou a été déplacée.</p>
      <Link 
        to="/" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;
