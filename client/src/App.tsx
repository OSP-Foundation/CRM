import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./utils";
import { Customer, Home } from "./views";
import "./App.scss";
import { Signup } from "./views/auth";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute isAuth />}>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<Customer />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/login" element={<Signup />} />
        <Route path="/sign-up" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
