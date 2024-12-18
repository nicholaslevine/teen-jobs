import { useState } from "react";
import toast from "react-hot-toast";
import useUserContext from "../../context/userContext";


function useLogout(){
    const [loading, setLoading] = useState(false);
    const {setUser} = useUserContext();

    async function logout(){
        setLoading(true);
        try {
            const res = await fetch("/api/user/logout", {
                method: "post"
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            setUser(null);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return {loading, logout};
}

export default useLogout;