
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

const Reservations = () => {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passportNumber: '',
    nationality: '',
  });
  const [step, setStep] = useState(1);
  const [seatNumber, setSeatNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [reservationComplete, setReservationComplete] = useState(false);
  
  const handleFlightSelect = (flight: Flight) => {
    setSelectedFlight(flight);
    setStep(2);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassengerInfo({
      ...passengerInfo,
      [name]: value,
    });
  };
  
  const handlePassengerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };
  
  const handleSeatSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeatNumber(e.target.value);
  };
  
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };
  
  const handleSeatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setReservationComplete(true);
      setStep(5);
    }, 1000);
  };
  
  const resetReservation = () => {
    setSelectedFlight(null);
    setPassengerInfo({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      passportNumber: '',
      nationality: '',
    });
    setSeatNumber('');
    setPaymentMethod('credit');
    setReservationComplete(false);
    setStep(1);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Faire une réservation</h1>
      
      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-gray-300'} flex items-center justify-center text-white font-bold`}>1</div>
            <div className="ml-2">Vol</div>
          </div>
          <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'} flex items-center justify-center text-white font-bold`}>2</div>
            <div className="ml-2">Passager</div>
          </div>
          <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'} flex items-center justify-center text-white font-bold`}>3</div>
            <div className="ml-2">Siège</div>
          </div>
          <div className={`flex-1 h-1 mx-4 ${step >= 4 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full ${step >= 4 ? 'bg-blue-600' : 'bg-gray-300'} flex items-center justify-center text-white font-bold`}>4</div>
            <div className="ml-2">Paiement</div>
          </div>
          <div className={`flex-1 h-1 mx-4 ${step >= 5 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full ${step >= 5 ? 'bg-blue-600' : 'bg-gray-300'} flex items-center justify-center text-white font-bold`}>5</div>
            <div className="ml-2">Confirmation</div>
          </div>
        </div>
      </div>
      
      {/* Step 1: Select Flight */}
      {step === 1 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Choisir un vol</h2>
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
                {mockFlights.map((flight) => (
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
                        onClick={() => handleFlightSelect(flight)}
                      >
                        Sélectionner
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Step 2: Passenger Information */}
      {step === 2 && selectedFlight && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Informations passager</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Vol sélectionné:</h3>
            <p className="text-gray-800">
              <span className="font-medium">{selectedFlight.departureCity} → {selectedFlight.arrivalCity}</span> | 
              {new Date(selectedFlight.departureDate).toLocaleString('fr-FR', {
                dateStyle: 'medium',
                timeStyle: 'short'
              })} | 
              Prix: <span className="font-medium">{selectedFlight.price} €</span>
            </p>
          </div>
          
          <form onSubmit={handlePassengerSubmit} className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                value={passengerInfo.firstName} 
                onChange={handleInputChange} 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                value={passengerInfo.lastName} 
                onChange={handleInputChange} 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={passengerInfo.email} 
                onChange={handleInputChange} 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={passengerInfo.phone} 
                onChange={handleInputChange} 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            
            <div>
              <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-700 mb-1">Numéro de passeport</label>
              <input 
                type="text" 
                id="passportNumber" 
                name="passportNumber" 
                value={passengerInfo.passportNumber} 
                onChange={handleInputChange} 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            
            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">Nationalité</label>
              <input 
                type="text" 
                id="nationality" 
                name="nationality" 
                value={passengerInfo.nationality} 
                onChange={handleInputChange} 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            
            <div className="md:col-span-2 flex justify-between mt-4">
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Retour
              </button>
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Continuer
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Step 3: Seat Selection */}
      {step === 3 && selectedFlight && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Sélection de siège</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Détails de la réservation:</h3>
            <p className="text-gray-800">
              <span className="font-medium">{selectedFlight.departureCity} → {selectedFlight.arrivalCity}</span> | 
              Passager: {passengerInfo.firstName} {passengerInfo.lastName} | 
              Prix: <span className="font-medium">{selectedFlight.price} €</span>
            </p>
          </div>
          
          <form onSubmit={handleSeatSubmit} className="space-y-6">
            <div>
              <label htmlFor="seatNumber" className="block text-sm font-medium text-gray-700 mb-1">Numéro de siège</label>
              <select 
                id="seatNumber" 
                value={seatNumber} 
                onChange={handleSeatSelect} 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="">Sélectionner un siège</option>
                <option value="A1">A1 - Hublot</option>
                <option value="B1">B1 - Milieu</option>
                <option value="C1">C1 - Couloir</option>
                <option value="A2">A2 - Hublot</option>
                <option value="B2">B2 - Milieu</option>
                <option value="C2">C2 - Couloir</option>
                <option value="A3">A3 - Hublot</option>
                <option value="B3">B3 - Milieu</option>
                <option value="C3">C3 - Couloir</option>
              </select>
            </div>
            
            <div className="flex justify-between mt-4">
              <button 
                type="button" 
                onClick={() => setStep(2)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Retour
              </button>
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                disabled={!seatNumber}
              >
                Continuer
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Step 4: Payment */}
      {step === 4 && selectedFlight && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Paiement</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Récapitulatif de la réservation:</h3>
            <p className="text-gray-800 mb-1">
              <span className="font-medium">{selectedFlight.departureCity} → {selectedFlight.arrivalCity}</span>
            </p>
            <p className="text-gray-800 mb-1">
              Date: {new Date(selectedFlight.departureDate).toLocaleString('fr-FR', {
                dateStyle: 'medium',
                timeStyle: 'short'
              })}
            </p>
            <p className="text-gray-800 mb-1">
              Passager: {passengerInfo.firstName} {passengerInfo.lastName}
            </p>
            <p className="text-gray-800 mb-1">
              Siège: {seatNumber}
            </p>
            <p className="text-gray-800 font-medium mt-2">
              Prix total: {selectedFlight.price} €
            </p>
          </div>
          
          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Méthode de paiement</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="credit" 
                    checked={paymentMethod === 'credit'} 
                    onChange={handlePaymentMethodChange} 
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Carte de crédit</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="paypal" 
                    checked={paymentMethod === 'paypal'} 
                    onChange={handlePaymentMethodChange} 
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">PayPal</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="bank" 
                    checked={paymentMethod === 'bank'} 
                    onChange={handlePaymentMethodChange} 
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Virement bancaire</span>
                </label>
              </div>
            </div>
            
            {paymentMethod === 'credit' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Numéro de carte</label>
                  <input 
                    type="text" 
                    id="cardNumber" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Nom sur la carte</label>
                  <input 
                    type="text" 
                    id="cardName" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                    <input 
                      type="text" 
                      id="expiryDate" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="MM/AA"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input 
                      type="text" 
                      id="cvv" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-between mt-4">
              <button 
                type="button" 
                onClick={() => setStep(3)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Retour
              </button>
              <button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Payer {selectedFlight.price} €
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Step 5: Confirmation */}
      {step === 5 && reservationComplete && selectedFlight && (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="mb-6">
            <svg className="mx-auto h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-green-600 mb-4">Réservation confirmée !</h2>
          <p className="text-gray-700 mb-6">
            Votre réservation pour le vol de {selectedFlight.departureCity} à {selectedFlight.arrivalCity} a été confirmée.
            Un email de confirmation a été envoyé à {passengerInfo.email}.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6 max-w-md mx-auto text-left">
            <h3 className="font-semibold text-gray-700 mb-2">Détails de la réservation:</h3>
            <p className="text-gray-800 mb-1">
              <span className="font-medium">Vol:</span> {selectedFlight.departureCity} → {selectedFlight.arrivalCity}
            </p>
            <p className="text-gray-800 mb-1">
              <span className="font-medium">Date:</span> {new Date(selectedFlight.departureDate).toLocaleString('fr-FR', {
                dateStyle: 'medium',
                timeStyle: 'short'
              })}
            </p>
            <p className="text-gray-800 mb-1">
              <span className="font-medium">Passager:</span> {passengerInfo.firstName} {passengerInfo.lastName}
            </p>
            <p className="text-gray-800 mb-1">
              <span className="font-medium">Siège:</span> {seatNumber}
            </p>
            <p className="text-gray-800 mb-1">
              <span className="font-medium">Référence de réservation:</span> RES{Math.floor(1000 + Math.random() * 9000)}
            </p>
            <p className="text-gray-800 font-medium mt-2">
              Prix total: {selectedFlight.price} €
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={resetReservation}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Nouvelle réservation
            </button>
            <button 
              onClick={() => alert('Fonctionnalité à implémenter: imprimer le billet')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Imprimer le billet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;
