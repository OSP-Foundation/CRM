import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./utils";
import { Company, Customer, Home, People } from "./views";
import { Forgot, SignIn, SignUp } from "./views/auth";
import { Account, EditAccount } from "./views/account";
import { CreateInvoice } from "./views/invoice";
import { CompanySettings, CurrencySettings } from "./views/settings";

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute isAuth />}>
        <Route path="/" element={<Home />} />

        <Route path="/customer" element={<Customer />} />
        <Route path="/people" element={<People />} />
        <Route path="/company" element={<Company />} />

        <Route path="/invoice/create" element={<CreateInvoice />} />

        <Route path="/account" element={<Account />} />
        <Route path="/account/edit" element={<EditAccount />} />

        <Route path="/settings/company" element={<CompanySettings />} />
        <Route path="/settings/currency" element={<CurrencySettings />} />
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
