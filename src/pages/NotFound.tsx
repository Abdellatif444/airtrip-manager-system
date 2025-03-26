
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page non trouvée</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link 
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Retourner à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;
