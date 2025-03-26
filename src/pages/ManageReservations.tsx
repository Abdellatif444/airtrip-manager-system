
import { useState } from 'react';

type Reservation = {
  id: number;
  flightId: number;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  passengerName: string;
  status: 'confirmed' | 'cancelled' | 'pending';
};

const mockReservations: Reservation[] = [
  {
    id: 1,
    flightId: 1,
    departureCity: "Paris",
    arrivalCity: "New York",
    departureDate: "2023-08-10T08:00:00",
    passengerName: "Jean Dupont",
    status: "confirmed"
  },
  {
    id: 2,
    flightId: 2,
    departureCity: "London",
    arrivalCity: "Tokyo",
    departureDate: "2023-08-15T10:30:00",
    passengerName: "Marie Lambert",
    status: "pending"
  },
  {
    id: 3,
    flightId: 3,
    departureCity: "Berlin",
    arrivalCity: "Dubai",
    departureDate: "2023-08-20T14:15:00",
    passengerName: "Pierre Martin",
    status: "cancelled"
  }
];

const ManageReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const cancelReservation = (id: number) => {
    setReservations(
      reservations.map(reservation => 
        reservation.id === id 
          ? { ...reservation, status: 'cancelled' as const } 
          : reservation
      )
    );
  };
  
  const confirmReservation = (id: number) => {
    setReservations(
      reservations.map(reservation => 
        reservation.id === id 
          ? { ...reservation, status: 'confirmed' as const } 
          : reservation
      )
    );
  };
  
  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = searchTerm === '' || 
      reservation.passengerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.departureCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.arrivalCity.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Gestion des Réservations</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
            <input 
              type="text" 
              id="search" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Rechercher par nom, ville de départ ou d'arrivée..."
            />
          </div>
          
          <div>
            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select 
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">Tous</option>
              <option value="confirmed">Confirmé</option>
              <option value="pending">En attente</option>
              <option value="cancelled">Annulé</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Réservations</h2>
        
        {filteredReservations.length === 0 ? (
          <p className="text-gray-700">Aucune réservation ne correspond à votre recherche.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passager</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vol</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{reservation.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reservation.passengerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reservation.departureCity} → {reservation.arrivalCity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(reservation.departureDate).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(reservation.status)}`}>
                        {reservation.status === 'confirmed' && 'Confirmé'}
                        {reservation.status === 'pending' && 'En attente'}
                        {reservation.status === 'cancelled' && 'Annulé'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        {reservation.status === 'pending' && (
                          <button 
                            className="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded text-xs"
                            onClick={() => confirmReservation(reservation.id)}
                          >
                            Confirmer
                          </button>
                        )}
                        
                        {reservation.status !== 'cancelled' && (
                          <button 
                            className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded text-xs"
                            onClick={() => cancelReservation(reservation.id)}
                          >
                            Annuler
                          </button>
                        )}
                      </div>
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

export default ManageReservations;
