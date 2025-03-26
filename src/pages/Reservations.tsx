
import { useState } from 'react';

type Flight = {
  id: number;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  arrivalDate: string;
  price: number;
};

const mockFlights: Flight[] = [
  {
    id: 1,
    departureCity: "Paris",
    arrivalCity: "New York",
    departureDate: "2023-08-10T08:00:00",
    arrivalDate: "2023-08-10T20:00:00",
    price: 450
  },
  {
    id: 2,
    departureCity: "London",
    arrivalCity: "Tokyo",
    departureDate: "2023-08-15T10:30:00",
    arrivalDate: "2023-08-16T09:30:00",
    price: 780
  }
];

const Reservations = () => {
  const [selectedFlightId, setSelectedFlightId] = useState<number | null>(null);
  const [passengerName, setPassengerName] = useState('');
  const [passengerEmail, setPassengerEmail] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  const [reservationSubmitted, setReservationSubmitted] = useState(false);

  const selectedFlight = selectedFlightId !== null 
    ? mockFlights.find(flight => flight.id === selectedFlightId) 
    : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would submit the reservation to the backend
    console.log('Reservation submitted:', {
      flightId: selectedFlightId,
      passengerName,
      passengerEmail,
      passengerPhone
    });
    
    // Show success message
    setReservationSubmitted(true);
    
    // Reset form
    setSelectedFlightId(null);
    setPassengerName('');
    setPassengerEmail('');
    setPassengerPhone('');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Réservation de Vol</h1>
      
      {reservationSubmitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6" role="alert">
          <p className="font-bold">Réservation réussie!</p>
          <p>Votre réservation a été confirmée. Vous recevrez bientôt un email de confirmation.</p>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Sélectionnez un vol</h2>
          
          <div className="space-y-4">
            {mockFlights.map((flight) => (
              <div 
                key={flight.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedFlightId === flight.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedFlightId(flight.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{flight.departureCity} → {flight.arrivalCity}</h3>
                    <p className="text-gray-600">
                      Départ: {new Date(flight.departureDate).toLocaleString('fr-FR', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </p>
                    <p className="text-gray-600">
                      Arrivée: {new Date(flight.arrivalDate).toLocaleString('fr-FR', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </p>
                  </div>
                  <div className="text-xl font-bold text-blue-600">{flight.price} €</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Informations passager</h2>
          
          {selectedFlight ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="passengerName" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                <input 
                  type="text" 
                  id="passengerName" 
                  value={passengerName} 
                  onChange={(e) => setPassengerName(e.target.value)} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="passengerEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  id="passengerEmail" 
                  value={passengerEmail} 
                  onChange={(e) => setPassengerEmail(e.target.value)} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="passengerPhone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input 
                  type="tel" 
                  id="passengerPhone" 
                  value={passengerPhone} 
                  onChange={(e) => setPassengerPhone(e.target.value)} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              
              <div className="pt-4">
                <h3 className="font-bold mb-2">Récapitulatif</h3>
                <p>Vol: {selectedFlight.departureCity} → {selectedFlight.arrivalCity}</p>
                <p>Date: {new Date(selectedFlight.departureDate).toLocaleDateString('fr-FR')}</p>
                <p className="font-bold text-blue-600 text-lg mt-2">Prix total: {selectedFlight.price} €</p>
              </div>
              
              <button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors w-full mt-4"
              >
                Confirmer la réservation
              </button>
            </form>
          ) : (
            <p className="text-gray-700">Veuillez sélectionner un vol pour continuer.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservations;
