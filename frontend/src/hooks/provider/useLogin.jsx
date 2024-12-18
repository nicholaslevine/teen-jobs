import toast from "react-hot-toast";
import { useProviderContext } from "../../context/providerContext";
import { useState } from "react";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const {setProvider} = useProviderContext();

    const login = async (username, password) => {
        setLoading(true)
        try {
            const res = await fetch('/api/provider/login', {
                method: "POST", 
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({username, password})
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error)
            }

            setProvider(data); 
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return {loading, login}
}

export default useLogin;