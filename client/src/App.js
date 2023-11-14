import { Route, Routes } from "react-router-dom";
import UsersListPage from "./containers/BackOffice/Users/UsersListPage";
// import AddNewUserPage from "./containers/BackOffice/Users/AddNewUserPage";
import EditUserPage from "./containers/BackOffice/Users/EditUserPage";
import LoginPage from "./containers/BackOffice/Login/LoginPage";
import EditCustomerPage from "./containers/BackOffice/Customers/EditCustomerPage";
import CustomersListPage from "./containers/BackOffice/Customers/CustomersListPage";
import ProductsListPage from "./containers/BackOffice/Products/ProductsListPage";
import AddNewProductPage from "./containers/BackOffice/Products/AddNewProductPage";
import EditProductPage from "./containers/BackOffice/Products/EditProductPage";
import OrdersPage from "./containers/BackOffice/Orders/OrdersPage";
import PaymentsListPage from "./containers/BackOffice/Payments/PaymentsListPage";
import DashboardPage from "./containers/BackOffice/Dashboard/DashboardPage";
import CategorieListPage from "./containers/BackOffice/Categorie.js/CategorieListTable";
import SubCategorieListPage from "./containers/BackOffice/SubCategorie.js/SubCategorieListTable";
import PrivateRoutes from "./utils/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
       
          <Route index element={<LoginPage />} />
          <Route element={<PrivateRoutes/>}>
          <Route path="/dashboard" element={<DashboardPage />} exact/>
          <Route path="/v1/users" element={<UsersListPage />} exact/>
          <Route path="/v1/users/:id" element={<EditUserPage />} exact/>
          <Route path="/v1/customers" element={<CustomersListPage />}exact>
            <Route path=":id" element={<EditCustomerPage />} exact/>
          </Route>
          <Route path="/v1/products" element={<ProductsListPage />} exact>
            <Route path="add" element={<AddNewProductPage />} exact/>
            <Route path=":id" element={<EditProductPage />} exact/>
          </Route>
          <Route path="/v1/orders" element={<OrdersPage />} exact/>
          <Route path="/v1/categorie" element={<CategorieListPage />}exact />
          <Route path="/v1/Subcategorie" element={<SubCategorieListPage />} exact/>
          <Route path="/payements" element={<PaymentsListPage />} exact/>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
