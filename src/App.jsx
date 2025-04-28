import { Navigate, Route, Routes } from "react-router-dom";
import CartProvider from "./context/CartProvider";
import ProductsProvider from "./context/ProductsProvider";
import CheckoutPage from "./pages/CheckoutPage";
import DetailsPage from "./pages/DetailsPage";
import PageNotFound from "./pages/PageNotFound";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <CartProvider>
      <ProductsProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:id" element={<DetailsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </ProductsProvider>
    </CartProvider>
  );
}

export default App;
