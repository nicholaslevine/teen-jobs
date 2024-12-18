import { useState } from "react";
import { useProviderContext } from "../../context/providerContext";
import toast from "react-hot-toast";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {setProvider} = useProviderContext();

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/provider/logout", {
                method: "POST"
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }
            setProvider(null);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {loading, logout}
}