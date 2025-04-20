import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';
import Prediction from './components/prediction';
import Landing from "./components/landing";
import Shop from './components/shop';
import SellerDashboard from './components/sellerDashboard';
import BookListingsPage from './components/bookListingPage';
import ProfilePage from './components/profilePage';
import './index.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/dashboard" element={<SellerDashboard />} />
        <Route path="/shop" element={<BookListingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
