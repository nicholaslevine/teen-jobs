import { createContext, useEffect, useContext, useState } from "react";
import toast from "react-hot-toast"; 

const UserContext = createContext({
    user: null,
    setUser: () => {},
    loading: true,
});

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        try {
            const res = await fetch('/api/user/info');
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error)
            } else {
                setUser(data);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        getUser();
    }, []);

    return (
        <UserContext.Provider value={{
            user,
            loading,
            setUser
        }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    return useContext(UserContext);
}
export default useUserContext;