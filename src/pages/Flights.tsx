
import { useState } from 'react';

type Flight = {
  id: number;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  arrivalDate: string;
  price: number;
  availableSeats: number;
};

const mockFlights: Flight[] = [
  {
    id: 1,
    departureCity: "Paris",
    arrivalCity: "New York",
    departureDate: "2023-08-10T08:00:00",
    arrivalDate: "2023-08-10T20:00:00",
    price: 450,
    availableSeats: 42
  },
  {
    id: 2,
    departureCity: "London",
    arrivalCity: "Tokyo",
    departureDate: "2023-08-15T10:30:00",
    arrivalDate: "2023-08-16T09:30:00",
    price: 780,
    availableSeats: 23
  },
  {
    id: 3,
    departureCity: "Berlin",
    arrivalCity: "Dubai",
    departureDate: "2023-08-20T14:15:00",
    arrivalDate: "2023-08-20T22:45:00",
    price: 320,
    availableSeats: 12
  }
];

const Flights = () => {
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(mockFlights);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter flights based on search criteria
    const filtered = mockFlights.filter(flight => {
      const matchDeparture = !departureCity || flight.departureCity.toLowerCase().includes(departureCity.toLowerCase());
      const matchArrival = !arrivalCity || flight.arrivalCity.toLowerCase().includes(arrivalCity.toLowerCase());
      const matchDate = !departureDate || flight.departureDate.includes(departureDate);
      
      return matchDeparture && matchArrival && matchDate;
    });
    
    setFilteredFlights(filtered);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Recherche de Vols</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSearch} className="grid md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="departureCity" className="block text-sm font-medium text-gray-700 mb-1">Ville de départ</label>
            <input 
              type="text" 
              id="departureCity" 
              value={departureCity} 
              onChange={(e) => setDepartureCity(e.target.value)} 
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Paris, London..."
            />
          </div>
          
          <div>
            <label htmlFor="arrivalCity" className="block text-sm font-medium text-gray-700 mb-1">Ville d'arrivée</label>
            <input 
              type="text" 
              id="arrivalCity" 
              value={arrivalCity} 
              onChange={(e) => setArrivalCity(e.target.value)} 
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="New York, Tokyo..."
            />
          </div>
          
          <div>
            <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-1">Date de départ</label>
            <input 
              type="date" 
              id="departureDate" 
              value={departureDate} 
              onChange={(e) => setDepartureDate(e.target.value)} 
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          
          <div className="flex items-end">
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors w-full"
            >
              Rechercher
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Résultats de la recherche</h2>
        
        {filteredFlights.length === 0 ? (
          <p className="text-gray-700">Aucun vol ne correspond à votre recherche.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vol</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Départ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrivée</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Places disponibles</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFlights.map((flight) => (
                  <tr key={flight.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {flight.departureCity} → {flight.arrivalCity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(flight.departureDate).toLocaleString('fr-FR', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(flight.arrivalDate).toLocaleString('fr-FR', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {flight.price} €
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {flight.availableSeats}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm transition-colors"
                        onClick={() => alert(`Réservation pour le vol ${flight.id} initiée`)}
                      >
                        Réserver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flights;
