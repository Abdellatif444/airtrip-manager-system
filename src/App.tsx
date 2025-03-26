
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Reservations from './pages/Reservations';
import ManageReservations from './pages/ManageReservations';
import Statistics from './pages/Statistics';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="flights" element={<Flights />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="manage-reservations" element={<ManageReservations />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
