import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./utils";
import { Customer, Home } from "./views";
import { Forgot, SignIn, SignUp } from "./views/auth";
import { Account } from "./views/account";
import { CreateInvoice } from "./views/invoice";

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute isAuth />}>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/invoice/create" element={<CreateInvoice />} />
        <Route path="/account" element={<Account />} />
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
