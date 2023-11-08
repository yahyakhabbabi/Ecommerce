
import { Route, Routes /* Link */ } from "react-router-dom";
import UsersListPage from "./containers/BackOffice/Users/UsersListPage";
import AddNewUserPage from "./containers/BackOffice/Users/AddNewUserPage";
import EditUserPage from "./containers/BackOffice/Users/EditUserPage";
import LoginPage from "./containers/BackOffice/Login/LoginPage";
// import RequiredAuth from "./components/RequireAuth";
import EditCustomerPage from "./containers/BackOffice/Customers/EditCustomerPage";
import CustomersListPage from "./containers/BackOffice/Customers/CustomersListPage";
import ProductsListPage from "./containers/BackOffice/Products/ProductsListPage";
import AddNewProductPage from "./containers/BackOffice/Products/AddNewProductPage";
import EditProductPage from "./containers/BackOffice/Products/EditProductPage";
import OrdersPage from "./containers/BackOffice/Orders/OrdersPage";
import PaymentsListPage from "./containers/BackOffice/Payments/PaymentsListPage";
import DashboardPage from "./containers/BackOffice/Dashboard/DashboardPage";
import Layout from "./components/layout";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/v1/users">
        <Route path="" element={<UsersListPage />} />
          <Route path="" element={<AddNewUserPage />} />
       
          <Route path=":id" element={<EditUserPage />} />
          
        </Route>
        <Route path="/v1/customers">
          <Route path="" element={<CustomersListPage />} />
          <Route path=":id" element={<EditCustomerPage />} />
        </Route>
        <Route path="/v1/products">
          <Route path="" element={<ProductsListPage />} />
          <Route path="" element={<AddNewProductPage />} />
          <Route path=":id" element={<EditProductPage />} />
        </Route>
        <Route path="/v1/orders">
          <Route path="" element={<OrdersPage />} />
        </Route>
        <Route path="/payements" element={<PaymentsListPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
