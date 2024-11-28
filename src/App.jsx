import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/frontend/home/Home";
import Clothes from "./components/pages/backend/clothe/Clothes";
import { StoreProvider } from "./components/store/StoreContext";
import Advertisement from "./components/pages/backend/advertisement/Advertisement";
import Category from "./components/pages/backend/category/Category";
import LogIn from "./components/pages/backend/access/Login";
import ForgotPassword from "./components/pages/backend/access/ForgotPassword";
import SetPassword from "./components/pages/backend/access/SetPassword";
import ProductInfo from "./components/pages/frontend/product-info/ProductInfo";


const App = () => {
  return (
    <StoreProvider>
      <Router>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/admin/clothe" element={<Clothes/>} />
        <Route path="/admin/advertisement" element={<Advertisement/>} />
        <Route path="/admin/category" element={<Category/>} />

        <Route path="/admin/login" element={<LogIn/>} />
        <Route path="/admin/forgot-password" element={<ForgotPassword/>} />
        <Route path="/admin/set-password" element={<SetPassword/>} />


        <Route path="/product/:slug" element={<ProductInfo/>} />
     </Routes>
    </Router>
    </StoreProvider>
    
  );
};

export default App;
