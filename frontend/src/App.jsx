import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import pages
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/User/LoginPage';
import LogoutPage from './pages/User/LogoutPage';
import RegisterPage from './pages/User/RegisterPage';
import Users from './pages/User/Users';

// Data Analytics
import AnalyicsDashboard from './pages/DataAnalytics/AnalyticsDashboard';

// Payment Management
import PaymentPage from './pages/PaymentManagement/PaymentPage';

// Garbage Bin
import AddGarbageBin from './pages/GarbageBin/AddGarbageBin';
import ListGarbageBin from './pages/GarbageBin/ListGarbageBin';
import UserListGarbageBin from './pages/GarbageBin/UserGarbageView';
import NotifyFullBins from './pages/GarbageTruck/NotifyFullBins';

// Waste Management
import WasteManagementPage from './pages/WasteManagement/WasteManagementPage';
import AddRecycleItem from './pages/WasteManagement/RecycleItems/AddRecycleItem';
import RecycleItems from './pages/WasteManagement/RecycleItems/RecycleItems';
import AddSpecialWaste from './pages/WasteManagement/SpecialWaste/AddSpecialWaste';
import SpecialWastes from './pages/WasteManagement/SpecialWaste/SpecialWastes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/login" element={<Layout><LoginPage /></Layout>} />
        <Route path="/logout" element={<Layout><LogoutPage /></Layout>} />
        <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
        <Route path='/users' element={<Layout><Users /></Layout>} />

        
        {/* Data Analytics */}
        <Route path="/data-analytics" element={<Layout><AnalyicsDashboard /></Layout>} />

        {/* Payment Management */}
        <Route path="/payment" element={<Layout><PaymentPage /></Layout>} />

        {/* Garbage Bin */}
        <Route path="/add-bin" element={<Layout><AddGarbageBin /></Layout>} />
        <Route path="/list-bin" element={<Layout><ListGarbageBin /></Layout>} />
        <Route path="/user-list-bin" element={<Layout><UserListGarbageBin /></Layout>} />

        <Route path="/truck-full-bin" element={<Layout><NotifyFullBins/></Layout>} />

        {/* Waste Management */}
        <Route path="/waste-management" element={<Layout><WasteManagementPage /></Layout>} />
        <Route path="/add-recycle-item" element={<Layout><AddRecycleItem /></Layout>} />
        <Route path="/recycle-items" element={<Layout><RecycleItems /></Layout>} />
        <Route path="/add-special-waste" element={<Layout><AddSpecialWaste /></Layout>} />
        <Route path="/special-wastes" element={<Layout><SpecialWastes /></Layout>} />

        {/* 404 Page Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
