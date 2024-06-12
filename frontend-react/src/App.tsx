import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup/Signup"
import NotFound from "./pages/NotFound"
import AuthProvider from "./providers/AuthProvider"
import PrivateRoutes from "./layouts/PrivateRoutes"
import WithAppbar from "./layouts/WithAppbar"
import PdfExtraction from "./pages/PdfExtract"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/home" element={<PrivateRoutes />}>
          <Route path="/home" element={<WithAppbar />}>
            <Route path="/home/" element={<Home />} />
            <Route path="/home/pdfextract/:id" element={<PdfExtraction />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
