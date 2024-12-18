import { useProviderContext } from "../context/providerContext";
import { useUserContext } from "../context/userContext"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import useUserLogout from "../hooks/user/useLogout";
import useProviderLogout from "../hooks/provider/useLogout";

const Header = () => {
    const { user } = useUserContext();
    const { provider } = useProviderContext();
    const navigate = useNavigate();
    const navClasses = "bg-gray-800 text-white p-4 shadow-md";
    const ulClasses = "flex space-x-4 justify-center items-center";
    const liClasses = "hover:bg-gray-700 px-3 py-2 rounded-md transition duration-300";
    const linkClasses = "text-white font-semibold hover:text-blue-300";

    function handleUserLogout(){
        const {logout} = useUserLogout();
        logout();
        navigate("/");
    }

    function handleProviderLogout(){
        const {logout} = useProviderLogout();
        logout();
        navigate("/");
    }


    if (user) {
        return (
            <nav className={navClasses}>
                <ul className={ulClasses}>
                    <li className={liClasses}><Link to={"/"} className={linkClasses}>Home</Link></li>
                    <li className={liClasses}><Link to={"/user"} className={linkClasses}>View Job Offers</Link></li>
                    <li className={liClasses}><button onClick={handleUserLogout} className={linkClasses}>Logout</button></li>
                </ul>
            </nav>
        )
    }

    if (provider) {
        return (
            <nav className={navClasses}>
                <ul className={ulClasses}>
                    <li className={liClasses}><Link to={"/"} className={linkClasses}>Home</Link></li>
                    <li className={liClasses}><Link to={"/provider"} className={linkClasses}>My Job Offers</Link></li>
                    <li className={liClasses}><Link to={"/provider/create"} className={linkClasses}>Create Job Offer</Link></li>
                    <li className={liClasses}><button onClick={handleProviderLogout} className={linkClasses}>Logout</button></li>
                </ul>
            </nav>
        )
    }

    return (
        <nav className={navClasses}>
            <ul className={ulClasses}>
                <li className={liClasses}><Link to={"/"} className={linkClasses}>Home</Link></li>
                <li className={liClasses}><Link to={"/provider/signup"} className={linkClasses}>Provider Sign Up</Link></li>
                <li className={liClasses}><Link to={"/user/create"} className={linkClasses}>User Sign Up</Link></li>
                <li className={liClasses}><Link to={"/provider/login"} className={linkClasses}>Provider Log In</Link></li>
                <li className={liClasses}><Link to={"/user/login"} className={linkClasses}>User Log In</Link></li>
            </ul>
        </nav>
    )
}

export default Header;