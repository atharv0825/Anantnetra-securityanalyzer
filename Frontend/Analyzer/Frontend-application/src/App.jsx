import "./App.css";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import AnalysisView from "./pages/AnalysisView";

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/:id" element={<AnalysisView />} />
      </Routes>
    </>
  );
}

export default App;