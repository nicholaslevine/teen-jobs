import { Route, Routes, Navigate } from "react-router-dom"
import useUserContext from "../../context/userContext";
import AvailableJobs from "./AvailableJobs";
import Login from "./Login";
import Signup from "./Signup";


function UserHomePage(){
    const {user} = useUserContext();
    return (
        <>
        <Routes>
            <Route path="/user" element={user ? <AvailableJobs /> : <Navigate to={"/user/login"} />}/>
            <Route path="/user/login" element={user ? <Navigate to={"/user"} /> : <Login />}/>
            <Route path="/user/signup" element={user ? <Navigate to={"/user"} /> : <Signup />}/>
        </Routes>
        </>
    )
}

export default UserHomePage;