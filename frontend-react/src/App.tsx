import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup/Signup"
import NotFound from "./pages/NotFound"
import AuthProvider from "./providers/AuthProvider"
import PrivateRoutes from "./layouts/PrivateRoutes"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/home" element={<PrivateRoutes />}>
          <Route path="/home" element={<Home/>}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
