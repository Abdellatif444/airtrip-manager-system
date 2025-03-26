
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type FlightStat = {
  month: string;
  reservations: number;
  cancellations: number;
};

type DestinationStat = {
  name: string;
  value: number;
};

const mockFlightStats: FlightStat[] = [
  { month: 'Jan', reservations: 65, cancellations: 5 },
  { month: 'Fév', reservations: 59, cancellations: 4 },
  { month: 'Mar', reservations: 80, cancellations: 7 },
  { month: 'Avr', reservations: 81, cancellations: 6 },
  { month: 'Mai', reservations: 90, cancellations: 8 },
  { month: 'Juin', reservations: 125, cancellations: 12 },
];

const mockDestinationStats: DestinationStat[] = [
  { name: 'Paris', value: 35 },
  { name: 'New York', value: 25 },
  { name: 'Tokyo', value: 20 },
  { name: 'London', value: 15 },
  { name: 'Dubai', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Statistics = () => {
  const [period, setPeriod] = useState('6months');

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Statistiques</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-blue-600">Aperçu des statistiques</h2>
          <select 
            value={period} 
            onChange={(e) => setPeriod(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1month">Dernier mois</option>
            <option value="3months">3 derniers mois</option>
            <option value="6months">6 derniers mois</option>
            <option value="1year">Dernière année</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">Réservations par mois</h3>
            <div className="h-80 bg-gray-50 p-4 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockFlightStats}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="reservations" fill="#3B82F6" name="Réservations" />
                  <Bar dataKey="cancellations" fill="#EF4444" name="Annulations" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">Destinations populaires</h3>
            <div className="h-80 bg-gray-50 p-4 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockDestinationStats}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockDestinationStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-blue-600 mb-3">Total des réservations</h3>
          <p className="text-4xl font-bold text-gray-800">512</p>
          <p className="text-green-600 mt-2">↑ 12% par rapport au mois dernier</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-blue-600 mb-3">Taux d'occupation</h3>
          <p className="text-4xl font-bold text-gray-800">87%</p>
          <p className="text-green-600 mt-2">↑ 5% par rapport au mois dernier</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-blue-600 mb-3">Annulations</h3>
          <p className="text-4xl font-bold text-gray-800">42</p>
          <p className="text-red-600 mt-2">↑ 2% par rapport au mois dernier</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
