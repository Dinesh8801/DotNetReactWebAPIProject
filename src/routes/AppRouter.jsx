import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import Register from "../pages/Register";
import Layout from "../components/layout/Layout";
import CategoryList from "../components/tables/CategoriesList";
import ProductsList from "../components/tables/ProductsList";
import Dashboard from "../components/modals/Dashboard";
import ProductDetails from "../components/modals/ProductDetails";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/categories" element={<CategoryList/>}/>
          <Route path="/products" element={<ProductsList/>}/>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
