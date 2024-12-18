import { Routes, Route, Navigate } from "react-router"
import { useUserContext } from "./context/userContext"
import { useProviderContext } from "./context/providerContext"
import Home from "./pages/Home"
import UserHomePage from "./pages/user/UserHomePage"
import ProviderHomePage from "./pages/provider/ProviderHomePage"
function App() {
  const {user} = useUserContext();
  const {provider} = useProviderContext();
  return (
    <div>
      <Routes>
        <Route path='/' element = {user ? <Navigate to={"/user"} /> : provider ? <Navigate to={"/provider"} /> : <Home />}/>
        <Route path="/user" element={<ProviderHomePage />}/>
        <Route path="/provider" element={<ProviderHomePage />}/>
      </Routes>
    </div>
  )
}

export default App
