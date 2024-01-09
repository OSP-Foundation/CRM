import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './utils'
import { CreateInvoice, Customer, Home } from './views'
import './App.scss'

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute isAuth />}>
        <Route path='/' element={<Home />} />
        <Route path='/customer' element={<Customer />} />
        <Route path='/invoice/create' element={<CreateInvoice />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path='/login' element={"HI"} />
      </Route>
    </Routes>
  )
}

export default App
