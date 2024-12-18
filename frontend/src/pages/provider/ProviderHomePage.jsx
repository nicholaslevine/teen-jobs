import { Route, Routes, Navigate } from "react-router-dom"
import { useProviderContext } from "../../context/providerContext";
import MyJobs from "./MyJobs";
import Login from "./Login";
import Signup from "./Signup";

function ProviderHomePage(){
    const {provider} = useProviderContext();
    return (
        <>
        <Routes>
            <Route path="/provider/" element={provider ? <MyJobs /> : <Navigate to={"/provider/login"} />}/>
            <Route path="/provider/login" element={provider ? <Navigate to={"/provider"} /> : <Login />}/>
            <Route path="/provider/signup" element={provider ? <Navigate to={"/provider"} /> : <Signup />}/>
            <Route path="/provider/create" element={provider ? <CreateJob /> : <Navigate to={"/provider/login"} />}/>
        </Routes>
        </>
    )
}

export default ProviderHomePage;