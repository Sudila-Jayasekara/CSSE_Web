import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import pages
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout';

// Data Analytics
import AnalyicsDashboard from './pages/DataAnalytics/AnalyticsDashboard';

// Payment Management
import PaymentDashboard from './pages/PaymentManagement/PaymentPage';

// Waste Collection
import WasteCollectionPage from './pages/WasteCollection/WasteCollectionPage';

// Waste Management
import WasteManagementPage from './pages/WasteManagement/WasteManagementPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        
        {/* Data Analytics */}
        <Route path="/data-analytics" element={<Layout><AnalyicsDashboard /></Layout>} />

        {/* Payment Management */}
        <Route path="/payment-management" element={<Layout><PaymentDashboard /></Layout>} />

        {/* Waste Collection */}
        <Route path="/waste-collection" element={<Layout><WasteCollectionPage /></Layout>} />

        {/* Waste Management */}
        <Route path="/waste-management" element={<Layout><WasteManagementPage /></Layout>} />

        {/* 404 Page Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
