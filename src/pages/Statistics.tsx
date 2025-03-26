
import { useState } from 'react';

type MonthlyData = {
  month: string;
  reservations: number;
  revenue: number;
};

type PopularRoute = {
  departureCity: string;
  arrivalCity: string;
  count: number;
};

const mockMonthlyData: MonthlyData[] = [
  { month: "Janvier", reservations: 120, revenue: 36000 },
  { month: "Février", reservations: 145, revenue: 43500 },
  { month: "Mars", reservations: 160, revenue: 48000 },
  { month: "Avril", reservations: 190, revenue: 57000 },
  { month: "Mai", reservations: 210, revenue: 63000 },
  { month: "Juin", reservations: 230, revenue: 69000 }
];

const mockPopularRoutes: PopularRoute[] = [
  { departureCity: "Paris", arrivalCity: "New York", count: 450 },
  { departureCity: "London", arrivalCity: "Tokyo", count: 325 },
  { departureCity: "Berlin", arrivalCity: "Dubai", count: 280 },
  { departureCity: "Paris", arrivalCity: "Los Angeles", count: 265 },
  { departureCity: "Madrid", arrivalCity: "Buenos Aires", count: 240 }
];

const Statistics = () => {
  const [period, setPeriod] = useState('6months');
  
  // In a real application, this would fetch data from the backend based on the selected period
  const monthlyData = mockMonthlyData;
  const popularRoutes = mockPopularRoutes;
  
  const totalReservations = monthlyData.reduce((sum, data) => sum + data.reservations, 0);
  const totalRevenue = monthlyData.reduce((sum, data) => sum + data.revenue, 0);
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Statistiques</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-600">Aperçu</h2>
          
          <select 
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="month">Dernier mois</option>
            <option value="3months">3 derniers mois</option>
            <option value="6months">6 derniers mois</option>
            <option value="year">Dernière année</option>
          </select>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Réservations totales</h3>
            <p className="text-3xl font-bold">{totalReservations}</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-600 mb-2">Revenus totaux</h3>
            <p className="text-3xl font-bold">{totalRevenue.toLocaleString('fr-FR')} €</p>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Réservations mensuelles</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mois</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Réservations</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenus</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {monthlyData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.reservations}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.revenue.toLocaleString('fr-FR')} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Routes les plus populaires</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Réservations</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {popularRoutes.map((route, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {route.departureCity} → {route.arrivalCity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {route.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
