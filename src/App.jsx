import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";

import { DarkModeProvider } from "./context/DarkModeContext";
import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen w-full bg-white text-black dark:bg-black dark:text-white">
      <DarkModeProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:barcode" element={<ProductDetailPage />} />
          </Routes>
        </Router>
      </DarkModeProvider>
    </div>
  );
}

export default App;
