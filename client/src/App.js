
import { Route, Routes } from "react-router-dom";
import UsersListPage from "./containers/BackOffice/Users/UsersListPage";
// import AddNewUserPage from "./containers/BackOffice/Users/AddNewUserPage";
import EditUserPage from "./containers/BackOffice/Users/EditUserPage";
import LoginPage from "./containers/BackOffice/Login/LoginPage";
import EditCustomerPage from "./containers/BackOffice/Customers/EditCustomerPage";
import CustomersListPage from "./containers/BackOffice/Customers/CustomersListPage";
import ProductsListPage from "./containers/BackOffice/Products/ProductsListPage";
import OrdersPage from "./containers/BackOffice/Orders/OrdersPage";
import PaymentsListPage from "./containers/BackOffice/Payments/PaymentsListPage";
import DashboardPage from "./containers/BackOffice/Dashboard/DashboardPage";
import CategorieListPage from "./containers/BackOffice/Categorie.js/CategorieListTable";
import SubCategorieListPage from "./containers/BackOffice/SubCategorie.js/SubCategorieListTable";
import PrivateRoutes from "./utils/PrivateRoute";
import EditCategoriePage from "./containers/BackOffice/Categorie.js/EditCategorie";
import EditsubCategoriePage from "./containers/BackOffice/SubCategorie.js/EditSubcategorie";
import EditProductsPage from "./containers/BackOffice/Products/EditProductPage";
import EditOrderPage from "./containers/BackOffice/Orders/EditOrder";
import UserProfilePage from "./containers/BackOffice/Users/UserProfilePage";

function App() {
  return (

    <div className="App">
      <Routes>

       
          <Route index element={<LoginPage />} />
          <Route element={<PrivateRoutes/>}>
          <Route path="/dashboard" element={<DashboardPage />} exact/>
          <Route path="/profile" element={<UserProfilePage />} exact/>
          <Route path="/v1/users" element={<UsersListPage />} exact/>
          <Route path="/v1/users/:id" element={<EditUserPage />} exact/>
          <Route path="/v1/customers/:id" element={<EditCustomerPage />} exact/>
          <Route path="/v1/customers" element={<CustomersListPage />}exact/>
          <Route path="/v1/products" element={<ProductsListPage />} exact/>
          <Route path="/v1/products/:id" element={<EditProductsPage />} exact/>
          <Route path="/v1/orders" element={<OrdersPage />} exact/>
          <Route path="/v1/orders/:id" element={<EditOrderPage />} exact/>
          <Route path="/v1/categorie" element={<CategorieListPage />}exact />
          <Route path="/v1/categorie/:id" element={<EditCategoriePage />}exact />
          <Route path="/v1/Subcategorie" element={<SubCategorieListPage />} exact/>
          <Route path="/v1/Subcategorie/:id" element={<EditsubCategoriePage />} exact/>
          <Route path="/payements" element={<PaymentsListPage />} exact/>
          </Route>
      </Routes>

    </div>
  );
}

export default App;
