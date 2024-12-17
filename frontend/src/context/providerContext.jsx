import { createContext, useEffect, useContext, useState } from "react";
import toast from "react-hot-toast";

const ProviderContext = createContext({
    provider: null,
    setProvider: () => {},
    loading: true
});

export const ProviderContextProvider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProvider = async () => {
            try {
                const res = await fetch("/api/provider/info");
                const data = await res.json();

                if (!res.ok){
                    throw new Error(data.error);
                }

                setProvider(data);

            } catch (error) {
                console.error(error);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getProvider();
    }, []);

    return (
        <ProviderContext.Provider value={{
            provider, 
            loading, 
            setProvider
        }}>
            {children}
        </ProviderContext.Provider>
    );
}

export const useProviderContext = () => {
    return useContext(ProviderContext)
}