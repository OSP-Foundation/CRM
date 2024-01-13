import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./utils";
import { CreateInvoice, Customer, Home } from "./views";
import { Forgot, SignIn, SignUp } from "./views/auth";
import "./App.scss";

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute isAuth />}>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/invoice/create" element={<CreateInvoice />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot" element={<Forgot />} />
      </Route>
    </Routes>
  );
};

export default App;
