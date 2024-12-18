import toast from "react-hot-toast";
import {useState} from "react";
import useUserContext from "../../context/userContext";

function useLogin(){
    const [loading, setLoading] = useState(false);
    const {setUser} = useUserContext();

    async function login(username, password){
        setLoading(true);
        try {
            const res = await fetch("/api/user/login", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({username, password})
            })
            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error);
            }

            setUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return {loading, login}
}

export default useLogin;