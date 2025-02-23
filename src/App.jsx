import { Navigate, Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import DetailsPage from "./pages/DetailsPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/products/:id" element={<DetailsPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}

export default App;
