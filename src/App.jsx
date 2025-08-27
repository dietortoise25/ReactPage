import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/home";
import BusinessCardPage from "./pages/business-card";
import BusinessCardDetailPage from "./pages/business-card-detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/business-card" element={<BusinessCardPage />} />
        <Route path="/business-card/:path" element={<BusinessCardDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
